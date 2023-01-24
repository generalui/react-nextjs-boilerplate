import { Todo } from 'types/Todo'
import { BaseListProps } from 'partials/List/List.types'

export interface TodoListProps extends BaseListProps {
	todos: Todo[]
}
