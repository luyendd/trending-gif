import * as React from "react";

import { IconProps } from "./props";

export function SearchIcon(props: IconProps): React.ReactElement<IconProps> {
  return (
    <svg fill="none" height="20" viewBox="0 0 21 20" width="21" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M8.83342 1.6665C5.15152 1.6665 2.16675 4.65127 2.16675 8.33317C2.16675 12.0151 5.15152 14.9998 8.83342 14.9998C10.374 14.9998 11.7925 14.4773 12.9215 13.5997L17.4108 18.0891C17.7363 18.4145 18.2639 18.4145 18.5893 18.0891C18.9148 17.7637 18.9148 17.236 18.5893 16.9106L14.1 12.4212C14.9775 11.2923 15.5001 9.87376 15.5001 8.33317C15.5001 4.65127 12.5153 1.6665 8.83342 1.6665ZM3.83341 8.33317C3.83341 5.57175 6.07199 3.33317 8.83342 3.33317C11.5948 3.33317 13.8334 5.57175 13.8334 8.33317C13.8334 11.0946 11.5948 13.3332 8.83342 13.3332C6.07199 13.3332 3.83341 11.0946 3.83341 8.33317Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}