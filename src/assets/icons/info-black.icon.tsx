import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5026 14.6693C12.1693 14.6693 15.1693 11.6693 15.1693 8.0026C15.1693 4.33594 12.1693 1.33594 8.5026 1.33594C4.83594 1.33594 1.83594 4.33594 1.83594 8.0026C1.83594 11.6693 4.83594 14.6693 8.5026 14.6693Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 10.6641L8.5 7.33073" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.50781 5.32812L8.50182 5.32812" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


`;

const InfoBlackIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { InfoBlackIcon };
