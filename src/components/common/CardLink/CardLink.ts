import styled from 'styled-components'

/**
 * This is an example component - not intended for production use
 */
export const CardLink = styled.a`
	display: block;
	padding: var(--spaces-3);
	text-align: left;
	color: inherit;
	text-decoration: none;
	max-width: 300px;
	height: 180px;
	border: 1px solid var(--colors-border-light);
	border-radius: var(--br-3);
	transition: var(--transitions-default);

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
	}

	&:hover {
		color: var(--colors-link);
		border-color: var(--colors-link);
	}

	&:active {
		color: var(--colors-link-dark);
		border-color: var(--colors-link-dark);
	}

	h2 {
		margin: 0 0 var(--spaces-3) 0;
		font-size: 1.5rem;
	}

	p {
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.5;
	}
`
