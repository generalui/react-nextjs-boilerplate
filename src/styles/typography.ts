import { css } from 'styled-components'

export const typography = css`
	// You can continue writing global styles here
	html,
	body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
			Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	}

	a {
		color: var(--colors-primary);
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			text-decoration: underline;
		}
	}

	code {
		font-size: 1.1rem;
		font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
			Bitstream Vera Sans Mono, Courier New, monospace;
	}
`
