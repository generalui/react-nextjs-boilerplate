import { MethodType } from '@prisma/client'
import { prisma } from 'utils/api/prisma'

export type LogDBEventProps<T = unknown> = {
	model: string
	recordIds: string[]
	methodType: MethodType
	body?: Record<string, T>
	userId: string
}

type LogDBEvent = <T>(dbEvent: LogDBEventProps<T>) => Promise<void>

export const logDBEvent: LogDBEvent = async (dbEvent) => {
	await prisma.eventLog.create({ data: dbEvent })
}
