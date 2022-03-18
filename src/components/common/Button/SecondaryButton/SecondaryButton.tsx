import styled from 'styled-components'
import { Button } from '../index'

export const SecondaryButton = styled(Button)`
	background: var(--colors-white);
	color: var(--colors-primary);
	border-color: var(--colors-primary);

	&:active {
		background: var(--colors-darkWhite);
		color: var(--colors-primary-dark);
		border-color: var(--colors-primary-dark);
	}
`
