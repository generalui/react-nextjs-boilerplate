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
			}
			// metaData: {
			// 	title: { key: 'fields.metaData.title' },
			// 	options: {
			// 		insertedAt: { key: 'fields.metaData.options.insertedAt' },
			// 		updatedAt: { key: 'fields.metaData.options.updatedAt' }
			// 	}
			// }
		},
		condition: {
			options: {
				equals: {
					label: { key: 'condition.options.equals.label' },
					inputType: { key: 'condition.options.equals.inputType' }
				},
				not: {
					label: { key: 'condition.options.not.label' },
					inputType: { key: 'condition.options.not.inputType' }
				},
				contains: {
					label: { key: 'condition.options.contains.label' },
					inputType: { key: 'condition.options.contains.inputType' }
				},
				// notIncludes: {
				// 	label: { key: 'condition.options.notIncludes.label' },
				// 	inputType: { key: 'condition.options.notIncludes.inputType' }
				// },
				startsWith: {
					label: { key: 'condition.options.startsWith.label' },
					inputType: { key: 'condition.options.startsWith.inputType' }
				}
				// lte: {
				// 	label: { key: 'condition.options.lte.label' },
				// 	inputType: { key: 'condition.options.lte.inputType' }
				// },
				// gte: {
				// 	label: { key: 'condition.options.gte.label' },
				// 	inputType: { key: 'condition.options.gte.inputType' }
				// }
			}
		}
	}
}

export default participants
