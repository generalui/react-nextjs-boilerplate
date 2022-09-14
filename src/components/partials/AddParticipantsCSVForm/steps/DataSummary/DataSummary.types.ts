import { z } from 'zod'
import { BaseFormProps } from 'partials/Form/Form.types'

export const REDCAP_CONCENT_FIELDS: { name: string; required?: boolean }[] = [
	{ name: 'name', required: true },
	{ name: 'email', required: true },
	{ name: 'gender' },
	{ name: 'maiden_name' },
	{ name: 'enrolled_tribe' },
	{ name: 'mailing_address' },
	{ name: 'physical_address' },
	{ name: 'home_phone_number' },
	{ name: 'work_phone number' },
	{ name: 'emergency_name' },
	{ name: 'emergency_phone' },
	{ name: 'emergency_address' },
	{ name: 'nearest_hospital_name' },
	{ name: 'nearest_hospital_address' },
	{ name: 'proof_of_consent' },
	{ name: 'withdrawal_procedures' }
]

const SelectSchema = z.object({
	value: z.string(),
	label: z.string(),
	meta: z.object({ field: z.string() }).optional()
})

// export const DataSummarySchema = z.object(FieldsSchema)
export const DataSummarySchema = z.object({
	['name']: SelectSchema,
	['email']: SelectSchema,
	['gender']: SelectSchema.optional(),
	['maiden_name']: SelectSchema.optional(),
	['enrolled_tribe']: SelectSchema.optional(),
	['mailing_address']: SelectSchema.optional(),
	['physical_address']: SelectSchema.optional(),
	['home_phone_number']: SelectSchema.optional(),
	['work_phone_number']: SelectSchema.optional(),
	['emergency_name']: SelectSchema.optional(),
	['emergency_phone']: SelectSchema.optional(),
	['emergency_address']: SelectSchema.optional(),
	['nearest_hospital_name']: SelectSchema.optional(),
	['nearest_hospital_address']: SelectSchema.optional(),
	['proof_of_consent']: SelectSchema.optional(),
	['withdrawal_procedures']: SelectSchema.optional()
})

export type DataSummaryInput = z.infer<typeof DataSummarySchema>

export interface DataSummaryProps extends BaseFormProps<DataSummaryInput> {
	unMappedFields: number
	mappedFields: number
	participantList: Record<string, unknown>[]
	fields?: string[]
}
