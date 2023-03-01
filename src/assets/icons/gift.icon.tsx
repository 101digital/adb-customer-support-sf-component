import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35938 10V15.14C9.35938 15.94 10.2394 16.41 10.9094 15.98L11.8494 15.36C12.1894 15.14 12.6194 15.14 12.9494 15.36L13.8394 15.96C14.4994 16.4 15.3894 15.93 15.3894 15.13V10H9.35938Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.3906 10H4.39062V18C4.39062 21 5.39062 22 8.39062 22H16.3906C19.3906 22 20.3906 21 20.3906 18V10Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.9219 7V8C21.9219 9.1 21.3919 10 19.9219 10H4.92188C3.39188 10 2.92188 9.1 2.92188 8V7C2.92188 5.9 3.39188 5 4.92188 5H19.9219C21.3919 5 21.9219 5.9 21.9219 7Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.0646 4.9975H6.54459C6.20459 4.6275 6.21459 4.0575 6.57459 3.6975L7.99459 2.2775C8.36459 1.9075 8.97459 1.9075 9.34459 2.2775L12.0646 4.9975Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.2934 4.9975H12.7734L15.4934 2.2775C15.8634 1.9075 16.4734 1.9075 16.8434 2.2775L18.2634 3.6975C18.6234 4.0575 18.6334 4.6275 18.2934 4.9975Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


`;

const GiftIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { GiftIcon };
