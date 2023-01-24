import {
	AggregatedTodoData,
	ApiTodo,
	ApiTodosResponse,
	PaginatedResponse,
	ParticipantInput,
	QueryOptions,
	Todo,
	TodoInput
} from 'types/index'
import { axios } from 'utils/client/axios'
import { axiosWithFiles } from 'utils/client/axiosWithFiles'
import { axiosWithQuery } from 'utils/client/axiosWithQuery'
import { standardizeApiTodo } from 'utils/models/todos'

export const getTodos = async (
	query?: QueryOptions
): Promise<PaginatedResponse & { todos: Todo[] }> => {
	const response = await axiosWithQuery<ApiTodosResponse>('/todos', query)
	const { count, hasMore, todos } = response.data

	return {
		count,
		hasMore,
		todos: todos.map(standardizeApiTodo)
	}
}

export const getTodo = async (todoId?: string): Promise<Todo> => {
	const response = await axios.get<ApiTodo>(`/todos/${todoId}`)

	if (!response.data) {
		throw new Error('Todo not found')
	}

	return standardizeApiTodo(response.data)
}

export const getParticipantTodos = async (
	participantId: string,
	query?: QueryOptions
): Promise<PaginatedResponse & { todos: Todo[] }> => {
	const response = await axiosWithQuery<ApiTodosResponse>(
		`/todos/participant/${participantId}`,
		query
	)

	if (!response.data) {
		return { count: 0, hasMore: false, todos: [] }
	}

	const { count, hasMore, todos } = response.data

	return {
		count,
		hasMore,
		todos: todos.map(standardizeApiTodo)
	}
}

export const createTodo = async ({ image, documentation, ...newTodo }: TodoInput) => {
	const response = await axiosWithFiles<ApiTodo>(
		'/todos',
		newTodo,
		{ image, documentation: documentation as File[] },
		'post'
	)
	return standardizeApiTodo(response.data)
}

export const updateTodo = async (
	todoId: string,
	{ image, documentation, ...updatedTodo }: Partial<TodoInput>
): Promise<Todo> => {
	const response = await axiosWithFiles<ApiTodo>(
		`/todos/${todoId}`,
		updatedTodo,
		{ image, documentation: documentation as File[] },
		'patch'
	)

	return standardizeApiTodo(response.data)
}

export const getAggregatedTodoData = async (): Promise<AggregatedTodoData> => {
	const response = await axios.get<AggregatedTodoData>('/aggregated-todo-data')
	return response.data
}

export const addParticipantsToTodo = async (
	todoId: string,
	participants: ParticipantInput[]
): Promise<undefined> => {
	const response = await axios.put(`/todos/${todoId}/add-participants`, { participants })
	return response.data
}
