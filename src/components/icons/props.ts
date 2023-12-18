import { MouseEvent } from "react";

interface Styleable {
  className?: string;
  style?: React.CSSProperties;
}

export interface IconProps extends Styleable {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  onClick?: (e: MouseEvent<SVGSVGElement>) => void;
}
