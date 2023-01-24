import { Consent } from '@prisma/client'
import { CommonProps } from 'types/CommonProps'
import { Todo } from 'types/Todo'

export interface DataTypeContainerProps extends CommonProps {
	todo?: Todo
	consent?: Partial<Consent>
}
