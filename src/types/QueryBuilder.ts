import { z } from 'zod'

export type OptionType = {
	label: string
	value: string
	type?: 'option' | 'mainField'
	isDisabled?: boolean
	inputType?: string
}

export const ConditionSchema = z.object({
	field: z.string(),
	condition: z.string(),
	value: z.string()
})

export type ConditionInput = z.infer<typeof ConditionSchema>

export type QueryBuilderModels = 'participant'
