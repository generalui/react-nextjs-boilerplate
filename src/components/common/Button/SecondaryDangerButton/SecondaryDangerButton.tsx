import styled from 'styled-components'
import { Button } from '../index'

export const SecondaryDangerButton = styled(Button)`
	background: var(--colors-white);
	color: var(--colors-danger);
	border-color: var(--colors-danger);

	&:active {
		background: var(--colors-darkWhite);
		color: var(--colors-danger-dark);
		border-color: var(--colors-danger-dark);
	}
`
