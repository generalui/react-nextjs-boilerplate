/**
 * Color palette used to populate themed colors
 *
 * Dark colors (e.g. darkBlue) are the same colors as their "non-dark"
 * counterparts with their "lightness" lowered by 20%. Or 10% in the case of "darkWhite"
 */
const palette = {
	blue: '#0070f3',
	darkBlue: '#00418d',
	genuiGreen: '#37f49e',
	darkGenuiGreen: '#0abb6a',
	transparent: 'transparent',
	red: '#dc3545',
	darkRed: '#921925',
	white: '#FFF',
	darkWhite: '#e6e6e6', // "Dark White" is used for click handling events on white elements WHITE with HSL - lightness set to 80%
	black: '#000',
	gray1: '#f6f8fa', // based on github.com --color-canvas-subtle
	gray2: '#eaeaea',
	gray3: '#575757',
	gray4: '#444',
	gray5: '#333',
	gray6: '#212529'
}

export const COLORS = {
	...palette,
	primary: palette.genuiGreen,
	['primary-dark']: palette.darkGenuiGreen,
	secondary: palette.blue,
	['secondary-dark']: palette.darkBlue,
	danger: palette.red,
	['danger-dark']: palette.darkRed,
	link: palette.genuiGreen,
	['link-dark']: palette.darkGenuiGreen,
	text: palette.gray6,
	['border-light']: palette.gray2,
	['border-dark']: palette.gray5
}
