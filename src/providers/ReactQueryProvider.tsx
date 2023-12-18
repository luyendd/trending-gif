"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProviderProps = {
  children: React.ReactNode;
};

// Create a react query provider to use `useClient` hook in client side
export function ReactQueryProvider({ children }: ProviderProps): React.ReactElement {
  const [client] = React.useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
