import { ConsentEnum, Study, StudyDataTypes } from '@prisma/client'

export const getDefaultConsentFromStudy = (study: Partial<Study>, dataType: string) => {
	const consentResult = study?.dataTypes?.includes(dataType as StudyDataTypes)
		? ConsentEnum.yes
		: ConsentEnum.no
	console.log('getConsent ~ consentResult', consentResult)
	return consentResult
}
