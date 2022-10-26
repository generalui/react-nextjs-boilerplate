import { QueryFields } from 'types/QueryBuilder'

export const participantQueryFields: QueryFields = {
	study: {
		model: 'study',
		title: { label: 'fields.study.title' },
		options: {
			title: { label: 'fields.study.options.title', inputType: 'text' },
			dataTypes: {
				label: 'fields.study.options.dataTypes',
				inputType: 'studyDataType',
				items: {
					analyses: { label: 'fields.dataTypes.options.analyses' },
					geneticData: { label: 'fields.dataTypes.options.geneticData' },
					healthRecords: { label: 'fields.dataTypes.options.healthRecords' },
					specimens: { label: 'fields.dataTypes.options.specimens' }
				}
			}
		}
	},
	participantInfo: {
		model: 'participant',
		title: { label: 'fields.participantInfo.title' },
		options: {
			id: {
				label: 'fields.participantInfo.options.id',
				inputType: 'text'
			},
			insertedAt: { label: 'fields.participantInfo.options.insertedAt', inputType: 'date' },
			updatedAt: { label: 'fields.participantInfo.options.updatedAt', inputType: 'date' }
		}
	}
}
