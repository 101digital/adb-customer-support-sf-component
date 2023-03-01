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
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.38487 2.94263C7.10507 1.68512 8.91822 1.68614 9.63742 2.9436L14.4281 11.3202C14.4281 11.3202 14.4281 11.3202 14.4281 11.3202C15.1428 12.5698 14.2398 14.1245 12.8014 14.1245H3.21273C1.77323 14.1245 0.871447 12.5688 1.58606 11.3196L6.38487 2.94263C6.38489 2.94261 6.38486 2.94265 6.38487 2.94263ZM8.76936 3.44006C8.4339 2.85355 7.58844 2.85322 7.25262 3.43964L2.45406 11.8161C2.12067 12.3989 2.54156 13.1245 3.21273 13.1245H12.8014C13.4723 13.1245 13.8932 12.3992 13.5601 11.8168L8.76936 3.44006C8.76936 3.44006 8.76936 3.44005 8.76936 3.44006Z" fill="#1B1B1B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00781 6.375C8.28396 6.375 8.50781 6.59886 8.50781 6.875V8.94167C8.50781 9.21781 8.28396 9.44167 8.00781 9.44167C7.73167 9.44167 7.50781 9.21781 7.50781 8.94167V6.875C7.50781 6.59886 7.73167 6.375 8.00781 6.375Z" fill="#1B1B1B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.33594 11.0026C7.33594 10.6344 7.63441 10.3359 8.0026 10.3359H8.00927C8.37746 10.3359 8.67594 10.6344 8.67594 11.0026C8.67594 11.3708 8.37746 11.6693 8.00927 11.6693H8.0026C7.63441 11.6693 7.33594 11.3708 7.33594 11.0026Z" fill="#1B1B1B"/>
</svg>
`;

const TriangleDangerIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { TriangleDangerIcon };
