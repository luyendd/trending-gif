# Improvement

To be honest, I want to bring every experiences to the project. Unfortunately, There are a lot of things and the timeline is limit. So I try to do my best to coverage most of the requirements. This documentation will show my deep thoughts about what's I'm gonna do next if I have time.

## Testing

### Unit Testing

I believe this is one of the most blunder technical issue in this project because I haven't finished setup Unit Testing for component that makes requests. The reason is the application currently using newest version in vitest and jsdom which is almost 50% faster than Jest (if application doesn't use many worker service). However, they have some issues when create testing with node server. So I haven't able to wrap everything together. If I'm able to finish the server setup testing in the application, here is the following steps to do next:

1. Testing mounted fetch list API

- Mock Fetch API to the component
- Check if the component displays the mockup data

2. Testing infinity loading

- Use user event to scroll down to the bottom of the page
- Detect if the mockup API have been called to the next page and the spinner have been display
- Check the if the new data have been applied
- Continue to scroll down to the bottom of the page and check one more time if the `offset` params increase

For now, I've set up test with normal components. Rest of the work is pretty simple, we need to use `react-testing-library` to test others components to achieve at least 85% code coverages.

### End-to-end (E2E) Testing

End-to-end testing, also known as E2E testing, is a way to make sure that applications behave as expected like a real-world scenario.
Playwright, Cypress,.etc. are nice tools that could help us to test the application as a user every deployment.

## Deployment

Despite deployment process is out of scope for FE position, it still very important parts of developing good product in real world.

- CI/ CD: Docker, Github Actions, VPS Setup
- Test coverage: Require coverage more than 85% in the PR before merging to main branch
- Code quality tool: To detect if there any bad code spot in a new PR (tool SonarQube)
- Preview link: With PR have prefix `preview/`, deploy a new URL by using newest hash commit like sub domain.

## Development

- Optimize eslint, typescript to make more strict rules: Add more import rules, format rules, pre commit command using husky,.etc.
- Template, tags for a new PR: To be able manages and have a good grips of the PR, template will be a important role to save lot of time for reviewers.
