import { createGlobalStyle, css } from 'styled-components'
import { normalize } from 'styled-normalize'
import { typography } from 'styles/typography'
import { BORDER_RADIUS, COLORS, FONT_FAMILY, SPACING, TRANSITIONS } from './constants'

interface CssVariable {
	[key: string]: string | number
}

function createCSSVariables(prefix: string, variables: CssVariable, suffix = '') {
	let output = ''

	for (const key in variables) {
		output += `--${prefix}-${key}: ${variables[key]}${suffix};`
	}

	return css`
		${output}
	`
}

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${typography}

  // You can continue writing global styles here
  html{
    ${createCSSVariables('colors', COLORS)}
    ${createCSSVariables('font-family', FONT_FAMILY)}
    ${createCSSVariables('transitions', TRANSITIONS)}
    ${createCSSVariables('spaces', SPACING)}
    ${createCSSVariables('br', BORDER_RADIUS)}
  }
  body {
    padding: 0;
  }
`
