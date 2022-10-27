import { Prisma } from '@prisma/client'
import { z } from 'zod'

export enum InputType {
	TEXT = 'text',
	DATE = 'date',
	SELECT = 'select'
}

export type QueryBuilderModel = 'participant' | 'study'

export type ItemsSelect = { label: string; value: string }[]

export type OptionType = {
	label: string
	value: string
	type?: 'option' | 'header'
	isDisabled?: boolean
	inputType?: string
	model?: QueryBuilderModel
	allowedFieldTypes?: string[]
	items?: ItemsSelect
}

export type Filter = {
	field: string
	condition: string
	value: string
	dataType?: string
	model?: QueryBuilderModel
}

const fieldSchema = z.object({
	label: z.string(),
	value: z.string(),
	type: z.string()
})

const fieldCondition = z.object({
	label: z.string(),
	value: z.string(),
	allowedFieldTypes: z.array(z.string())
})

export const FilterSchema = z.object({
	field: fieldSchema,
	condition: fieldCondition,
	value: z.union([z.string(), z.object({ label: z.string(), value: z.string() })])
})

export type ApiQueryResults = {
	modelCount: number
	summaryModelCount: number
	list: Prisma.ParticipantGetPayload<{
		include: {
			_count: true
		}
	}>[]
}

export type FilterInput = z.infer<typeof FilterSchema>

export type QueryBuilderParams = {
	model: QueryBuilderModel
	summaryModel: QueryBuilderModel
	filters: FilterInput[]
}

export type QueryBuilderFieldGroup = {
	model: string
	title: { label: string }
	options: Record<string, QueryBuilderField>
}

export type QueryBuilderField = {
	label: string
	items?: Record<string, { label: string }>
	inputType: InputType
}

export type QueryFields = Record<string, QueryBuilderFieldGroup>
