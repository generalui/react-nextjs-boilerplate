import { InputType, QueryFields } from 'types/QueryBuilder'

export const participantQueryFields: QueryFields = {
	study: {
		model: 'study',
		title: { label: 'fields.study.title' },
		options: {
			title: { label: 'fields.study.options.title', inputType: InputType.TEXT },
			dataTypes: {
				label: 'fields.study.options.dataTypes',
				inputType: InputType.SELECT,
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
				inputType: InputType.TEXT
			},
			insertedAt: { label: 'fields.participantInfo.options.insertedAt', inputType: InputType.DATE },
			updatedAt: { label: 'fields.participantInfo.options.updatedAt', inputType: InputType.DATE }
		}
	}
}
