import * as React from "react";
import { SvgCss } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

const xml = `<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7.96317 7.96317L1 14.9263" stroke="#14142B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const ArrowForwardIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { ArrowForwardIcon };
