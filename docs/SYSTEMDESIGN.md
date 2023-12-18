# GIFS's System Design

Designing a web application that displays the trending GIFs on [![Giphy](https://img.shields.io/badge/giphy-000?style=for-the-badge&logo=giphy&logoColor=white)](https://giphy.com/)

## Requirements

Split this into different parts which are user stories, technical requirements and others to make them more easier to approach.

### User Stories

- See a list of trending GIFs on Giphy.
- Search for the GIFs and see a list of result.
- Expand a GIF and see the details of it - at least contains username and rating.
- Support desktop users with min resolution supported is 1280px, max resolution can be 1920px.
- Good user experience and pleasant UI.

### Technical Requirements

- Run code in one step.
- Simple, maintainable, clean and well-commented code.
- Write test case.

### Others

Answer following questions:

- How long did you spend on the coding test?
- What would you add to your solution if you had more time?

## Architecture / High-level Design

[![High-level Design Diagram](/docs/assets/high-level-arch.webp)](/docs/assets/high-level-arch.webp)

### Components Responsibilities

- **Giphy API:** Provides HTTPS APIS to fetch trending and search gifs.
- **Controller:** Controls the flow of data within in the application and make requests to **Giphy API**.
- **Client Data:** Stores and caches data needed in the application.
- **Home UI**:
  - **Gif List:** Show the trending Gifs and contains expand button to show gif detail.
  - **Search Input:** Autocomplete input to make better UX.

### Rendering approach

Basically, we have two ways of rendering data to users, whether to render on the server or the client

- Server-side rendering (SSR): Render HTML on the server side, best for SEO and doesn't need many interactions with users.
- Client-side rendering (CSR): Render HTML on the client side, it will load JS first then add HTML to the browser. Best when needed interactions with user.

Giphy application is somewhat between, there is a need for SEO but a need for lots of interactions as well. Therefore, we should do hybrid mode which both use SSR and CSR in our application. To achieve that goal, we could choose Angular, NextJS or NuxtJS to support this rendering strategy. I personally choose NextJS due to my knowledge and deadline requirement.

## Inteface Definition (API)

- [Gif Trending List](https://developers.giphy.com/docs/api/endpoint/#trending)
- [Gif Search](https://developers.giphy.com/docs/api/endpoint/#search)

Even though we don't have a choice to decide which kind of paginated content the APIs would return. But it would be interest in discuss about which is kind of paginated we should use. There are two common ways to return paginated content, each with its own pros and cons.

- Offset-based pagination
- Cursor-based pagination

**Offset-based pagination**

Offset-based pagination will use an offset combine with a limit to retrieve data from DB. So you just need to send two parameter which are `page` and `size` in a request. It has the following advantages:

- Users can jump to a specific page.
- Easy to see the total number of pages.
- Easy to implement on the back end. The offset for a SQL query is - calculated using (page - 1) \* size.

However, it has some issues:

- Inaccurate / duplicated data when data update frequently. For example, user has fetched 10 trending gifs, then Gifphy API changes the ranking of that 10 gifs to below. Then user fetch page 2, they will see duplicated data.
- Update page size value when loading new data is complex.
- Query performance degrades over time because the database still has to read up to those count + offset rows, discard the offset rows and only return the count rows.

**Cursor-based pagination**
Cursor-based pagination uses a pointer (the cursor) to a specific record in a dataset. And then server will passes number of records based on `size` value from the requested record. Advantages of cursor-based pagination:

- More efficient and faster on large datasets.
- Avoids the inaccurate page in offset-based pagination.
  Disavantages of cursor-based pagination since the client doesn't know the cursor:
- Cannot jump to a specific page without going through the previous pages.
- More complex to implement compared to offset-based pagination.

### Which is kind of pagination suitable for the application?

As you can see, the choice between offset-based pagination and cursor-based pagination is based on data and requirements. For Trending Gif List application:

- Ranking might not be update frequently (Gifs from the bottom need time to rank up).
- The data is not very large consider they're trending gifs.
  Offset-based pagination is better choice for the application (Giphy API is currently using offset-based pagination).

## Deep dive and optimizations

As there are a few sections within the application, it'll be more organized to focus in one section at a time and looking at optimizations that can be done on each section:

- General optimizations.
- Search input optimizations.
- Gif list optimizations.
- Others.

### General optimizations

These optimizations are applicable to every section of the page.

#### Code splitting JavaScript for faster performance:

As an application grows, the number of pages and features increase which will result in more JavaScript and CSS code needed to run the application. Code splitting is a technique to split code needed on a page into separate files so that they can be loaded in parallel or when they're needed.

Generally, code splitting can be done on two levels:

- Split on the page level: Each page will only load the JavaScript and CSS needed on that page.
- Lazy loading resources within a page: Load non-critical resources only when needed or after the initial render, such as code that's only needed lower down on the page, or code that's used only when interacted with (e.g. expand component).

#### Keyboard shortcuts

Shortcuts to help users navigate between the posts and perform common actions, super handy. (e.g. Command / Window + K to focus on search input)

#### Handling states

- Error: Display error states if any network requests have failed, or when there's no network connectivity.
- Empty: Show empty states if there is no results for search results.
- Loading: Show spinner when there's a request.

### Search input optimizations

#### Handling concurrent requests/race conditions

What happens if the user makes changes to the query while there's a pending network request? If there are multiple pending network requests, we will need to be mindful not to display results for a previous search query. We cannot rely on the return order of network responses from the server because an earlier request might only be completed later than a request fired later on.

To know which request's response we should use display, we could:

1. Attach a timestamp to each request to determine the latest request and only display the results of the latest request (not the latest response!). Discard the response of irrelevant queries.
2. Save the results in an object/map, keyed by the search query string and only present the results corresponding to the input value in the search input.

Which option is better? Given we have a cache that remembers the responses of each search query, option 2 is clearly better. Refer to the cache section details for more details.

It's not advisable to abort requests (via AbortController) or discard responses since the server would have received and processed the request and returned the data back to the client.

Saving the responses for historical keystrokes is useful for cases where users accidentally typed an extra character. "f' -> "fo" -> "foo" -> meant to type "t" but mistyped an extra "r" due to fat fingers -> "foot" -> "footr" -> deletes extra "r" -> "foot" (results for "foot" can be displayed immediately it is already in the cache). If there's debounce, then the requests for "foot" might not have fired immediately and there's no response for "foot" to cache, so this mainly benefits autocomplete components without debounce or people who type slower than the debounce duration.

#### Offline usage

If we detect that the device has entirely lost network connection, there's not a whole lot that we can do since our component relies on the server for data. But we could do the following to improve the UX:

- Read purely from cache. Obviously this is not very useful if the cache is empty.
- Not fire any requests so as not to waste CPU cycles.
- Indicate that there's no network connection somewhere in the component.

#### Cache

What is the cache for? Caches are typically used to improve performance of queries and reducing processing costs by saving the results of previous queries in memory. If/when the user searches for the same term again, instead of hitting the server for the results, we can retrieve the results from memory and instantly show the results, effectively removing the need for any network request and latency.

#### Caching strategy

Caching is a space/time tradeoff where we trade memory space to save on processing time. Having cached results stay around for too long is a bad idea because it consumes memory and if too much time has passed since the cache entry was written, the results are likely irrelevant/outdated. There's little value in using memory to store irrelevant/outdated results. Therefore, we should only keep our cache for hours.

#### Debouncing/throttling

By limiting the number of network requests that can be fired, we reduce server payload and CPU processing.

#### Autofocus

User has a high intention to use the autocomplete when it is present on the screen

### Gif list optimizations

#### Masonry layout
Masonry is a grid layout based on width columns, it have dynamic height cell. This helps optimize the use of space inside the web page by reducing any unnecessary gaps. Best use for showing many photos with different sizes.

#### Infinite scrolling

An infinite scrolling Gif works by fetching the next set of gifs when the user has scrolled to the end of their current loaded gif. his results in the user seeing a loading indicator and a short delay where the user has to wait for the new gifs to be fetched and displayed.

A way to reduce or entirely eliminate the waiting time is to load the next set of new gifs before the user hits the bottom of the page so that the user never has to see any loading indicators. But it also could waste user resources because user might not scroll to the end.

There are two popular ways to implement infinite scroll, and both involve rendering a marker element at the bottom of the feed:

- Listen for the `scroll` event: Add a `scroll` event listener (ideally debounced) to the page or a timer (via `setInterval`) that checks whether the position of the marker element is within a certain threshold from the bottom of the page. The position of the marker element can be obtained using `Element.getBoundingClientRect`.
- **Intersection Observer API**: Use the `Intersection Observer API` to monitor when the marker element is entering or exiting another element or intersecting by a specified amount.
  The `Intersection Observer API` is a browser native API and is preferred over `Element.getBoundingClientRect()`.

#### Virtualized lists

With infinite scrolling, all the loaded gifs are on one single page. As the user scrolls further down the page, more gifs are appended to the DOM, the DOM size rapidly increases. As trending Gif application could show more than 3000 records, it can be a cause of performance issues in terms of DOM size, rendering, and browser memory usage.

Virtualized lists is a technique to render only the gifs that are within the viewport. In practice, we could replaces the contents of off-screen gifs with empty `<div>`s, add dynamically calculated inline styles (e.g. `style="height: 200px; width: 200px"`) to set the height of the gifs so as to preserve the scroll position and add the `hidden` attribute to them. This will improve rendering performance in terms of:

- Browser painting: Fewer DOM nodes to render and fewer layout computations to be made.
- Virtual DOM reconciliation (React-specific): Since the gif is now a simpler empty version, it's easier for React to diff the virtual DOM vs the real DOM to determine what DOM updates have to be made.

#### Preserving feed scroll position on remounting

Trending scroll positions should be preserved if users navigate to another page and back to the feed. This can be achieved in single-page applications if the feed list data is cached within the client store along with the scroll position. When the user goes back to the feed page, since the data is already on the client, the feed list can be read from the client store and immediately presented on the screen with the previous scroll position; no server round-trip is needed.

#### Rendering images

Since images are everywhere, we definitely need to discuss about image optimization techniques:

- Content Delivery Network (CDN): Use a (CDN) to host and serve images for faster loading performance.
- Placeholder image: Use random color to fill the gif until the gif loaded.
- `<img>`s should use proper `alt` text.
- Adaptive image loading based on poor network speed: Render a low-resolution placeholder image and require users to explicitly click on them to load the high-resolution image.

## Others

### Accessibility

### Testing

- Unit Testing.
- End-to-end (E2E) Testing.

### Deployment

- CI/ CD.
- Test coverage.
- Code quality tool.
- Preview link for PR with prefix `preview/`.

### Development
- Optimize eslint, typescript to make more strict rules.
- Example and Template for new PR.
- Apply Storybook
