import { Consent } from '@prisma/client'
import { z } from 'zod'

export type ConsentPickDataTypes = Pick<
	Consent,
	'analyses' | 'geneticData' | 'healthRecords' | 'specimens'
>

export const ConsentSchema = z.object({
	analyses: z.boolean().optional(),
	geneticData: z.boolean().optional(),
	healthRecords: z.boolean().optional(),
	specimens: z.boolean().optional()
})

// The shape of data in outgoing axios requests
export type ConsentInput = z.infer<typeof ConsentSchema>
