import { z } from 'zod'

export type OptionType = {
	label: string
	value: string
	type?: 'option' | 'mainField'
	isDisabled?: boolean
	inputType?: string
}

const fieldSchema = z.object({
	label: z.string(),
	value: z.string(),
	type: z.string()
})

const fieldCondition = z.object({
	label: z.string(),
	value: z.string(),
	inputType: z.string()
})

export const ConditionSchema = z.object({
	field: fieldSchema,
	condition: fieldCondition,
	value: z.string()
})

export type QueryResults = {
	modelCount: number
	summaryModelCount: number
}

export type ConditionInput = z.infer<typeof ConditionSchema>

export type QueryBuilderModels = 'participant' | 'study'
