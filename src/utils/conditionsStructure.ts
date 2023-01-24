export const participants = {
	conditions: {
		fields: {
			todo: {
				model: 'todo',
				title: { key: 'fields.todo.title' },
				options: {
					title: { key: 'fields.todo.options.title' },
					todoCoordinator: { key: 'fields.todo.options.todoCoordinator' }
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
