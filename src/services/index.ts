import { Api } from "./api";
import { GifResponse, SearchGifsParams, SearchTagParams, TrendingGifsParams } from "./type";

// Set up a common service API. Normally it should be private api that required permissions. But we skip that for now
export class Service {
  api: Api;

  constructor() {
    this.api = new Api(process.env.NEXT_PUBLIC_API_URL as string, process.env.NEXT_PUBLIC_GIPHY_KEY as string);
  }

  getTrendingGifs(params: TrendingGifsParams, cache?: RequestCache) {
    return this.api.get<GifResponse[]>("/gifs/trending", { params, cache });
  }

  getGifs(params: SearchGifsParams, cache?: RequestCache) {
    return this.api.get<GifResponse[]>("/gifs/search", { params, cache });
  }

  getSearchTags(params: SearchTagParams, cache?: RequestCache) {
    return this.api.get<{ name: string }[]>("/gifs/search/tags", { params, cache });
  }

  getTrendingSearches(cache?: RequestCache) {
    return this.api.get<string[]>("/trending/searches", { cache });
  }
}

const service = new Service();

export default service;
