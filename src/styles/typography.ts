import { css } from 'styled-components'

export const typography = css`
	// You can continue writing global styles here
	html,
	body {
		font-family: var(--font-family-body);
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
		font-family: var(--font-family-code);
	}
`
