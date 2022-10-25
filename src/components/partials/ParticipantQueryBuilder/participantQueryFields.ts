export const participantQueryFields = {
	study: {
		model: 'study',
		title: { label: 'fields.study.title' },
		options: {
			title: { label: 'fields.study.options.title', inputType: 'text' },
			dataTypes: { label: 'fields.study.options.dataTypes', inputType: 'text' }
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
