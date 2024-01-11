import * as React from "react";

import { cn } from "@/utils/cn";

import { IconProps } from "../icons/props";

export function Spinner({ className, ...rest }: IconProps): React.ReactElement {
  return (
    <svg
      aria-label="Spinner Loading"
      className={cn("h-8 w-8 animate-spin text-blue-400", className)}
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
