import * as React from "react";

import { cn } from "@/utils/cn";

type ExtendableComponentProps<C extends React.ElementType, P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithoutRef<C>,
  keyof P
> &
  P;

type Props = ExtendableComponentProps<"svg">;

export function Spinner({ className, ...rest }: Props): React.ReactElement {
  return (
    <svg
      className={cn("animate-spin text-blue-400 w-8 h-8", className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
