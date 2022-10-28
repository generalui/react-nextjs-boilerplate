const participants = {
	conditions: {
		fields: {
			study: {
				title: { message: 'Study' },
				options: {
					title: { message: 'Study Name' },
					dataTypes: { message: 'Study Data Type' },
					studyCoordinator: { message: 'Study Coordinator' }
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
