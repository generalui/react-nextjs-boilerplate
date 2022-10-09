import { Consent, ConsentEnum } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ConsentInput } from 'types/Consent'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

const getWhere = (studyId: string, participantId: string) => ({
	studyId_participantId: {
		studyId: studyId,
		participantId: participantId
	}
})

const getConsentEnum = (val: boolean) => (val ? ConsentEnum.yes : ConsentEnum.no)

const getConsentUpdate = (consent: ConsentInput) => {
	return Object.entries(consent).reduce<Partial<Consent>>((result, [key, value]) => {
		return {
			...result,
			[key as keyof typeof consent]: getConsentEnum(value)
		}
	}, {})
}

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId, participantId } = req.query
	const where = getWhere(studyId as string, participantId as string)

	const consentQuery = async () => {
		const consentQueryResult = await prisma.participantsOnStudies.findUnique({
			where,
			include: {
				consent: true
			}
		})

		return consentQueryResult?.consent
	}

	handleQuery({
		req,
		res,
		model: 'consent',
		role: 'general',
		query: consentQuery
	})
})

apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
	const { studyId, participantId } = req.query
	const { consent } = req.body
	const where = getWhere(studyId as string, participantId as string)
	console.log('apiRoute.put ~ where', where)
	const consentUpdate = getConsentUpdate(consent)
	console.log('apiRoute.put ~ consentUpdate', consentUpdate)

	const consentQuery = async () => {
		// Get the consent id
		const participantOnStudyResult = await prisma.participantsOnStudies.findUnique({
			where,
			include: {
				consent: true
			}
		})
		console.log('consentQuery ~ participantOnStudyResult', participantOnStudyResult)
		if (!participantOnStudyResult?.consent?.id) {
			throw new Error('No consent found for this participant on this study')
		}
		const consentUpdateResult = await prisma.consent.update({
			where: {
				id: participantOnStudyResult?.consent?.id
			},
			data: consentUpdate
		})

		console.log('consentQuery ~ consentQueryResult', consentUpdateResult)

		return consentUpdateResult
	}

	handleQuery({
		req,
		res,
		model: 'consent',
		role: 'general',
		query: consentQuery
	})
})

export default apiRoute
