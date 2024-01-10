import { MouseEvent } from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  onClick?: (e: MouseEvent<SVGSVGElement>) => void;
}
