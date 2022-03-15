import { css } from 'styled-components'

export const typography = css`
	// You can continue writing global styles here
	html,
	body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
			Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	}

	a {
		color: #0070f3;
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			text-decoration: underline;
		}
	}
`
