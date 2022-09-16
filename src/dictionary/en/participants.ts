const participants = {
	filters: {
		title: {
			message: 'Filters'
		}
	},
	conditions: {
		fields: {
			title: { message: 'Field' },
			study: {
				title: { message: 'Study' },
				options: {
					studyName: { message: 'Study Name' },
					studyCoordinator: { message: 'Study Coordinator' }
				}
			},
			dataTypes: {
				title: { message: 'Data Types' },
				options: {
					geneticData: { message: 'Genetic Data' },
					healthRecords: { message: 'Health Records' },
					specimens: { message: 'Specimens' }
				}
			},
			participantInfo: {
				title: { message: 'Participant Info' },
				options: {
					participantId: {
						message: 'Participant ID'
					},
					dateOfBirth: { message: 'Date of Birth' }
				}
			},
			metaData: {
				title: { message: 'Meta Data' },
				options: {
					dateAdded: { message: 'Date Added' },
					dateUpdated: { message: 'Date Updated' }
				}
			}
		},
		condition: {
			title: { message: 'Condition' },
			options: {
				equals: { label: { message: 'Equals' }, inputType: { message: 'text' } },
				notEquals: { label: { message: 'Not Equals' }, inputType: { message: 'text' } },
				includes: { label: { message: 'Includes' }, inputType: { message: 'text' } },
				notIncludes: { label: { message: 'Not Includes' }, inputType: { message: 'text' } },
				startsWith: { label: { message: 'Starts With' }, inputType: { message: 'text' } },
				before: { label: { message: 'Before' }, inputType: { message: 'date' } },
				after: { label: { message: 'After' }, inputType: { message: 'date' } }
			}
		},
		value: {
			message: 'Value'
		}
	}
}

export default participants
