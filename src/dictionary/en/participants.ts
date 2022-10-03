const participants = {
	conditions: {
		fields: {
			study: {
				title: { message: 'Study' },
				options: {
					title: { message: 'Study Name' },
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
					},
					insertedAt: { message: 'Date Added' },
					updatedAt: { message: 'Date Updated' }
				}
			}
		},
		condition: {
			options: {
				equals: { label: { message: 'Equals' } },
				not: { label: { message: 'Not Equals' } },
				contains: { label: { message: 'Contains' } },
				startsWith: { label: { message: 'Starts With' } },
				lte: { label: { message: 'Before' } },
				gte: { label: { message: 'After' } }
			}
		}
	}
}

export default participants
