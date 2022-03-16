import { createGlobalStyle, css } from 'styled-components'
import { normalize } from 'styled-normalize'
import { typography } from 'styles/typography'
import { COLORS, FONT_FAMILY } from './constants'

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
  }
  body {
    padding: 0;
  }
`
