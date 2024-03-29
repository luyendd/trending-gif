import { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { afterAll,afterEach, beforeAll } from "vitest";

export default function startServer(serverConfig: Array<RequestHandler>) {
  const server = setupServer(...serverConfig);
  
  beforeAll(() => server.listen({ onUnhandledRequest: `error` }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
}
