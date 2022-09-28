const participants = {
	conditions: {
		fields: {
			study: {
				model: 'study',
				title: { key: 'fields.study.title' },
				options: {
					title: { key: 'fields.study.options.title' },
					studyCoordinator: { key: 'fields.study.options.studyCoordinator' }
				}
			},
			participantInfo: {
				model: 'participant',
				title: { key: 'fields.participantInfo.title' },
				options: {
					id: {
						key: 'fields.participantInfo.options.id'
					},
					insertedAt: { key: 'fields.metaData.options.insertedAt' },
					updatedAt: { key: 'fields.metaData.options.updatedAt' }
				}
			}
			// metaData: {
			// 	model: 'participant',
			// 	title: { key: 'fields.metaData.title' },
			// 	options: {
			// 	}
			// }
		},
		condition: {
			options: {
				equals: {
					label: { key: 'condition.options.equals.label' },
					allowedFieldTypes: ['text', 'date']
				},
				not: {
					label: { key: 'condition.options.not.label' },
					allowedFieldTypes: ['text', 'date']
				},
				contains: {
					label: { key: 'condition.options.contains.label' },
					allowedFieldTypes: ['text']
				},
				startsWith: {
					label: { key: 'condition.options.startsWith.label' },
					allowedFieldTypes: ['text']
				},
				lte: {
					label: { key: 'condition.options.lte.label' },
					allowedFieldTypes: ['date']
				},
				gte: {
					label: { key: 'condition.options.gte.label' },
					allowedFieldTypes: ['date']
				}
			}
		}
	}
}

export default participants
