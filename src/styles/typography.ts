import { css } from 'styled-components'

export const typography = css`
	// You can continue writing global styles here
	html,
	body {
		font-family: var(--font-family-body);
	}

	a {
		color: var(--colors-link);
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			text-decoration: underline;
		}

		&:active {
			color: var(--colors-link-dark);
		}
	}

	code {
		font-size: 1.1rem;
		font-family: var(--font-family-code);
	}

	h1 {
		line-height: 1.15;
		font-size: var(--space-7);
	}

	p {
		line-height: 1.5;
		font-size: 1.5rem;
	}
`
