"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";

import { ReactQueryProvider } from "./ReactQueryProvider";

type ProviderProps = {
  children: React.ReactNode;
};

// Setup a common provider
export function Providers({ children }: ProviderProps): React.ReactElement {
  return (
    <ReactQueryProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ReactQueryProvider>
  );
}
