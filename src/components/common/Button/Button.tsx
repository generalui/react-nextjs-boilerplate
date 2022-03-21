import styled from 'styled-components'

export const Button = styled.button`
	padding: var(--spaces-3);
	background: var(--colors-primary);
	color: var(--colors-text);
	border-radius: var(--br-1);
	border: solid 1px black;
	cursor: pointer;
	transition: var(--transitions-default);

	&:active {
		background: var(--colors-primary-dark);
	}
`
