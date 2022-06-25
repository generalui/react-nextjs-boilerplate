import { EventState, MethodType } from '@prisma/client'
import { prisma } from 'utils/api/prisma'

export type LogDBEventProps<T> = {
	model: string
	recordId: string
	methodType: MethodType
	body?: Record<string, any>
	state: EventState
	userId: string
}

type LogDBEvent = <T>(dbEvent: LogDBEventProps<T>) => Promise<void>

export const logDBEvent: LogDBEvent = async (dbEvent) => {
	await prisma.eventLog.create({ data: dbEvent })
}
