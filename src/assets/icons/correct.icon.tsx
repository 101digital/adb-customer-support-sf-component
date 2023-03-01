import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="73" height="72" viewBox="0 0 73 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.5 63.75C51.8259 63.75 64.25 51.3259 64.25 36C64.25 20.6741 51.8259 8.25 36.5 8.25C21.1741 8.25 8.75 20.6741 8.75 36C8.75 51.3259 21.1741 63.75 36.5 63.75Z" stroke="#C4C4C4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.5 36.9844L32.75 45.2344L49.25 28.7344" stroke="#C4C4C4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

const CorrectIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { CorrectIcon };
