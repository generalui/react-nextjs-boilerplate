const participants = {
	conditions: {
		fields: {
			todo: {
				title: { message: 'Todo' },
				options: {
					title: { message: 'Todo Name' },
					dataTypes: { message: 'Todo Data Type' },
					todoCoordinator: { message: 'Todo Coordinator' }
				}
			},
			dataTypes: {
				title: { message: 'Data Types' },
				options: {
					analyses: { message: 'Analyses' },
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
		}
	}
}

export default participants
