import { CommonProps } from 'types/CommonProps'

export interface GridProps extends CommonProps {
	cols?: string | number
	rows?: string | number
	gap?: string | number
	flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
	center?: boolean
}
