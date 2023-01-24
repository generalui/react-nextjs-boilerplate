import { TodoDataType, TodoStatus } from '@prisma/client'
import { uniqueId } from 'lodash'
import { Session } from 'next-auth'
import { ApiTodo, OptimisticTodo, Todo, TodoInput, TodoInputMap, todoInputMap } from 'types/Todo'

// TODO: The types in here are gnarly, it'd be valuable to simplify this

export const standardizeApiTodo = (apiTodo: ApiTodo): Todo => ({
	...apiTodo,
	endDate: new Date(apiTodo.endDate),
	submissionDate: new Date(apiTodo.submissionDate)
})

type TodoKeyHandler<T extends keyof TodoInput> = (
	value: TodoInput[T],
	session: Session | null
) => Todo[TodoInputMap[T]]

const createTodoImage: TodoKeyHandler<'image'> = (image: TodoInput['image']) =>
	image
		? {
				id: new Date().toISOString(),
				imageId: new Date().toISOString(),
				todoId: '',
				userId: '',
				insertedAt: new Date(),
				image: {
					id: new Date().toISOString(),
					name: '',
					fileType: 'image',
					uploadedById: null,
					todoId: null,
					url: typeof image === 'string' ? image : URL.createObjectURL(image),
					insertedAt: new Date()
				}
		  }
		: null

const createTodoUser: TodoKeyHandler<'coordinator'> = (_value, session) => [
	{
		todoId: new Date().toISOString(),
		userId: new Date().toISOString(),
		insertedAt: new Date(),
		user: {
			id: new Date().toISOString(),
			email: session?.user?.email || '',
			name: session?.user?.name || '',
			emailVerified: null,
			password: null,
			image: null,
			role: 'admin'
		}
	}
]

const createDocumentation: TodoKeyHandler<'documentation'> = (documentation, session) => {
	if (!documentation) return []
	else {
		return documentation.map((document) => {
			return {
				id: new Date().toISOString(),
				uploadedById: session?.user?.email || '',
				name: document.name,
				url: '',
				fileType: document.type,
				todoId: null,
				insertedAt: new Date(document.lastModified)
			}
		})
	}
}

const optimisticTodoKeyHandlers: {
	[key in keyof Required<TodoInput>]: TodoKeyHandler<key>
} = {
	coordinator: createTodoUser,
	description: (value) => value,
	endDate: (endDate) => new Date(endDate),
	image: createTodoImage,
	status: (value) => value as TodoStatus,
	title: (value) => value,
	dataTypes: (value) => value as TodoDataType[],
	documentation: createDocumentation
}

export const createOptimisticTodoFromFormData = (
	data: TodoInput,
	session: Session | null
): OptimisticTodo =>
	(Object.keys(data) as (keyof TodoInput)[]).reduce(
		(accumulator, key) => {
			const value = data[key]
			const todoKey = todoInputMap[key]

			if (!todoKey) {
				return accumulator
			}

			return {
				...accumulator,
				[todoKey]: value ? optimisticTodoKeyHandlers[key](value, session) : undefined
			}
		},
		{
			submissionDate: new Date(),
			id: uniqueId()
		} as OptimisticTodo
	)

export const createPartialTodoFromFormData = (
	data: Partial<TodoInput>,
	session: Session | null
): Partial<Todo> =>
	(Object.keys(data) as (keyof TodoInput)[]).reduce((accumulator, key) => {
		const value = data[key] as TodoInput[typeof key]
		return {
			...accumulator,
			[key]: value ? optimisticTodoKeyHandlers[key](value, session) : undefined
		}
	}, {})
