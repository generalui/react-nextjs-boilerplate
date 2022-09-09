import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface DataTypeContainerProps extends CommonProps {
	study: Study | undefined
}
