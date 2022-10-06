const participants = {
	conditions: {
		fields: {
			// study: {
			// 	title: { key: 'fields.study.title' },
			// 	options: {
			// 		studyName: { key: 'fields.study.options.studyName', dbFieldName: 'id' },
			// 		studyCoordinator: { key: 'fields.study.options.studyCoordinator', dbFieldName: 'id' }
			// 	}
			// },
			// dataTypes: {
			// 	title: { key: 'fields.dataTypes.title' },
			// 	options: {
			// 		geneticData: { key: 'fields.dataTypes.options.geneticData', dbFieldName: 'id' },
			// 		healthRecords: { key: 'fields.dataTypes.options.healthRecords', dbFieldName: 'id' },
			// 		specimens: { key: 'fields.dataTypes.options.specimens', dbFieldName: 'id' }
			// 	}
			// },
			participantInfo: {
				title: { key: 'fields.participantInfo.title' },
				options: {
					id: {
						key: 'fields.participantInfo.options.id'
					}
				}
			},
			metaData: {
				title: { key: 'fields.metaData.title' },
				options: {
					insertedAt: { key: 'fields.metaData.options.insertedAt' },
					updatedAt: { key: 'fields.metaData.options.updatedAt' }
				}
			}
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
				// notIncludes: {
				// 	label: { key: 'condition.options.notIncludes.label' },
				// },
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
