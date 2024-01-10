import { ApiResponse, Body } from "./type";

type RequestConfig = {
  headers?: HeadersInit;
  params?: Record<string, string>;
  cache?: RequestCache;
};

function dedupSlash(url: string): string {
  return url.replace(/([^:]\/)\/+/g, "$1");
}

// Set up API Service
export class Api {
  baseURL: string;
  apiKey: string;
  interceptors: Array<(request: RequestInit) => void>;
  defaultConfig: RequestConfig;

  constructor(baseURL: string, apiKey: string, defaultConfig: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.interceptors = [];
    this.defaultConfig = defaultConfig;
  }

  // Create interceptor for the future
  addInterceptor(interceptFn: (request: RequestInit) => void) {
    this.interceptors.push(interceptFn);
  }

  appendParamsToURL(url: string, params?: RequestConfig["params"]) {
    if (!params) {
      return url;
    }
    const _url = new URL(url);
    const keys = Object.keys(params);
    for (const k of keys) {
      if (params[k] !== null && params[k] !== undefined) {
        _url.searchParams.append(k, encodeURI(params[k]));
      }
    }
    return _url.href;
  }

  async request<T, U>(
    _url: string,
    payload: FormData | Body<T> | null,
    method: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<U>> {
    const url = this.appendParamsToURL(dedupSlash(`${this.baseURL}/${_url}`), {
      api_key: this.apiKey,
      ...(config?.params || {}),
    });
    let headers = config?.headers || {};
    let body;

    if (payload) {
      if (typeof payload !== "string") {
        if ("append" in payload) {
          body = payload;
        } else {
          body = JSON.stringify(payload);
          headers = {
            "Content-Type": "application/json",
            ...headers,
          };
        }
      }
    }

    const requestObj: RequestInit = {
      ...this.defaultConfig,
      ...(config?.cache ? { cache: config.cache } : {}),
      method,
      headers: new Headers(headers),
      body,
    };

    // interceptors
    for (const fn of this.interceptors) {
      fn(requestObj);
    }
    const response = await fetch(url, requestObj);
    const data = await response.json();

    if (response.status >= 400) {
      // sync the original axios reject a promise on error, throw Error here to emulate it
      return Promise.reject(data);
    }
    if (!response.ok) {
      console.error("Error:", data);
      return Promise.resolve(data);
    }
    return Promise.resolve(data);
  }

  async get<U>(url: string, config?: RequestConfig): Promise<ApiResponse<U>> {
    return await this.request<null, U>(url, null, "GET", config);
  }

  // Even though current application doesn't use any requests except Get request, it's still better to set up and create other requests for further development
  async post<T, U>(url: string, payload: FormData | Body<T> | null, config?: RequestConfig): Promise<ApiResponse<U>> {
    return await this.request<T, U>(url, payload, "POST", config);
  }

  async patch<T, U>(url: string, payload: FormData | Body<T> | null, config?: RequestConfig): Promise<ApiResponse<U>> {
    return await this.request<T, U>(url, payload, "PATCH", config);
  }

  async put<T, U>(url: string, payload: FormData | Body<T> | null, config?: RequestConfig): Promise<ApiResponse<U>> {
    return await this.request<T, U>(url, payload, "PUT", config);
  }

  async delete<T, U>(url: string, config?: RequestConfig): Promise<ApiResponse<U>> {
    return await this.request<T, U>(url, null, "DELETE", config);
  }
}
