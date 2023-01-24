import { CommonProps } from 'types/CommonProps'
import { Todo } from 'types/Todo'

export interface TodoInfoProps extends CommonProps {
	isAdmin: boolean
	singleTodoId: string
	loading: boolean
	todo: Todo | undefined
}
