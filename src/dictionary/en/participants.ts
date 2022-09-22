const participants = {
	conditions: {
		fields: {
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
					id: {
						message: 'Participant ID'
					}
				}
			},
			metaData: {
				title: { message: 'Meta Data' },
				options: {
					insertedAt: { message: 'Date Added' },
					updatedAt: { message: 'Date Updated' }
				}
			}
		},
		condition: {
			options: {
				equals: { label: { message: 'Equals' }, inputType: { message: 'text' } },
				not: { label: { message: 'Not Equals' }, inputType: { message: 'text' } },
				contains: { label: { message: 'Contains' }, inputType: { message: 'text' } },
				// notIncludes: { label: { message: 'Not Includes' }, inputType: { message: 'text' } },
				startsWith: { label: { message: 'Starts With' }, inputType: { message: 'text' } },
				lte: { label: { message: 'Before' }, inputType: { message: 'date' } },
				gte: { label: { message: 'After' }, inputType: { message: 'date' } }
			}
		}
	}
}

export default participants
