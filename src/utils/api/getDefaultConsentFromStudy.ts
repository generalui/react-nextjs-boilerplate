import { ConsentEnum, Study, StudyDataType } from '@prisma/client'

export const getDefaultConsentFromStudy = (study: Partial<Study>, dataType: string) => {
	const consentResult = study?.dataTypes?.includes(dataType as StudyDataType)
		? ConsentEnum.yes
		: ConsentEnum.no

	return consentResult
}
