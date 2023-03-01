import * as React from "react";
import { SvgCss } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 3.98958C11.78 3.76958 9.54667 3.65625 7.32 3.65625C6 3.65625 4.68 3.72292 3.36 3.85625L2 3.98958" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.66406 3.31594L5.81073 2.4426C5.9174 1.80927 5.9974 1.33594 7.12406 1.33594H8.87073C9.9974 1.33594 10.0841 1.83594 10.1841 2.44927L10.3307 3.31594" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.563 6.09375L12.1297 12.8071C12.0564 13.8537 11.9964 14.6671 10.1364 14.6671H5.85635C3.99635 14.6671 3.93635 13.8537 3.86302 12.8071L3.42969 6.09375" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.88281 11H9.10281" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.33594 8.33594H9.66927" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const TrashBinIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { TrashBinIcon };
