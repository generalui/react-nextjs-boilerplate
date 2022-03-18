import styled from 'styled-components'
import { Button } from '../index'

export const PrimaryDangerButton = styled(Button)`
	background: var(--colors-danger);
	color: var(--colors-white);

	&:active {
		background: var(--colors-danger-dark);
	}
`
