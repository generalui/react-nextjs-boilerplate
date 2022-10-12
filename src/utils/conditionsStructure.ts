export const participants = {
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
					insertedAt: { key: 'fields.participantInfo.options.insertedAt' },
					updatedAt: { key: 'fields.participantInfo.options.updatedAt' }
				}
			}
		}
	}
}
