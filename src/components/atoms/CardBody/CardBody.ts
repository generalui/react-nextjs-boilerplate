import styled from 'styled-components'

export const CardBody = styled.a`
	color: black;
	transition: color 0.15s ease, border-color 0.15s ease;

	&:hover,
	&:focus,
	&:active {
		color: #0070f3;
		border-color: #0070f3;
	}
`
