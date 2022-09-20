const participants = {
	conditions: {
		fields: {
			study: {
				title: { key: 'fields.study.title' },
				options: {
					studyName: { key: 'fields.study.options.studyName' },
					studyCoordinator: { key: 'fields.study.options.studyCoordinator' }
				}
			},
			dataTypes: {
				title: { key: 'fields.dataTypes.title' },
				options: {
					geneticData: { key: 'fields.dataTypes.options.geneticData' },
					healthRecords: { key: 'fields.dataTypes.options.healthRecords' },
					specimens: { key: 'fields.dataTypes.options.specimens' }
				}
			},
			participantInfo: {
				title: { key: 'fields.participantInfo.title' },
				options: {
					participantId: {
						key: 'fields.participantInfo.options.participantId'
					},
					dateOfBirth: { key: 'fields.participantInfo.options.dateOfBirth' }
				}
			},
			metaData: {
				title: { key: 'fields.metaData.title' },
				options: {
					dateAdded: { key: 'fields.metaData.options.dateAdded' },
					dateUpdated: { key: 'fields.metaData.options.dateUpdated' }
				}
			}
		},
		condition: {
			options: {
				equals: {
					label: { key: 'condition.options.equals.label' },
					inputType: { key: 'condition.options.equals.inputType' }
				},
				notEquals: {
					label: { key: 'condition.options.notEquals.label' },
					inputType: { key: 'condition.options.notEquals.inputType' }
				},
				includes: {
					label: { key: 'condition.options.includes.label' },
					inputType: { key: 'condition.options.includes.inputType' }
				},
				notIncludes: {
					label: { key: 'condition.options.notIncludes.label' },
					inputType: { key: 'condition.options.notIncludes.inputType' }
				},
				startsWith: {
					label: { key: 'condition.options.startsWith.label' },
					inputType: { key: 'condition.options.startsWith.inputType' }
				},
				before: {
					label: { key: 'condition.options.before.label' },
					inputType: { key: 'condition.options.before.inputType' }
				},
				after: {
					label: { key: 'condition.options.after.label' },
					inputType: { key: 'condition.options.after.inputType' }
				}
			}
		}
	}
}

export default participants
