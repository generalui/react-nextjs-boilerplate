import { Prisma } from '@prisma/client'
import { z } from 'zod'

export type QueryBuilderModel = 'participant' | 'study'

export type OptionType = {
	label: string
	value: string
	type?: 'option' | 'header'
	isDisabled?: boolean
	inputType?: string
	model?: QueryBuilderModel
	allowedFieldTypes?: string[]
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

export const ConditionSchema = z.object({
	field: fieldSchema,
	condition: fieldCondition,
	value: z.string()
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

export type ConditionInput = z.infer<typeof ConditionSchema>

export type QueryBuilderParams = {
	model: QueryBuilderModel
	summaryModel: QueryBuilderModel
	filters: ConditionInput | undefined
}
