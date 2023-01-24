import { CommonProps } from 'types/CommonProps'
import { Todo } from 'types/Todo'

export interface TodoDocumentationProps extends CommonProps {
	singleTodoId: string
	todo: Todo | undefined
	loading: boolean
}
