import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.52344 3.33594L14.0015 8.0026L9.52344 12.6693" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="13.0703" y1="8.10156" x2="2.74827" y2="8.10156" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const RedeemArrowIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { RedeemArrowIcon };
