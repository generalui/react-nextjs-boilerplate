import { Prisma, TodoDataType, TodoStatus, User } from '@prisma/client'
import { ReactNode } from 'react'
import { PaginatedResponse } from 'types/PaginatedResponse'
import { z } from 'zod'
import { todoDefaultIncludes, todoIncludesConsent } from 'utils/includes/todoIncludes'
import { ListData } from 'partials/List/List.types'

export type Todo = Prisma.TodoGetPayload<typeof todoDefaultIncludes>

export type TodoWithConsent = Prisma.TodoGetPayload<typeof todoIncludesConsent>

export type TodoWithParticipantIds = Prisma.TodoGetPayload<{
	include: {
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}>

export type TodoWithParticipants = Prisma.TodoGetPayload<{
	include: {
		participants: {
			include: {
				participant: true
			}
		}
	}
}>

export type ParticipantQueryBuilderTodoPayload = Prisma.TodoGetPayload<{
	select: {
		id: true
		participants: {
			include: {
				// TODO: this should only select the fields relevant to the
				participant: {
					include: {
						todos: {
							select: {
								consent: true
							}
						}
					}
				}
			}
		}
	}
}>

export type ApiTodosResponse = PaginatedResponse & {
	todos: ApiTodo[]
}

export type ApiTodosServerResponse = PaginatedResponse & {
	todos: Todo[]
}

export type ApiTodo = Omit<Todo, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticTodo = Todo & { users: { user: User }[] }

type TodoInputToTodoMap = { [key in keyof TodoInput]: keyof Todo }

export const todoInputMap: TodoInputToTodoMap = {
	coordinator: 'users',
	description: 'description',
	endDate: 'endDate',
	image: 'image',
	status: 'status',
	title: 'title',
	dataTypes: 'dataTypes',
	documentation: 'documentation'
}

export type TodoInputMap = typeof todoInputMap

export type SelectOptionsType<T = unknown> = {
	value: string
	label: ReactNode | string
	meta?: T
}

export const TodoSchema = z.object({
	title: z.string(),
	coordinator: z.object({ label: z.string(), value: z.string() }).transform((val) => val.value),
	endDate: z.string().refine((date) => {
		return new Date(date) > new Date()
	}, 'The end date must be after today'),
	description: z.string(),
	status: z.nativeEnum(TodoStatus).optional().default('new'),
	image: z.any().optional(),
	dataTypes: z
		.object({ label: z.string(), value: z.string() })
		.array()
		.transform((val) => val.map((v) => v.value))
		.refine((data) => data.length > 0, {
			message: 'At least one data type required',
			path: ['dataTypes'] // path of error
		}),
	documentation: z.any().array().optional()
})

// The shape of data in outgoing axios requests
export type TodoInput = z.infer<typeof TodoSchema>

export type TodoInputPreTransform = Omit<TodoInput, 'coordinator' | 'dataTypes'> & {
	coordinator?: SelectOptionsType
	dataTypes?: SelectOptionsType[]
}

export const publicFilesSchema = z.object({
	documentation: z.any().array()
})
