const participant = {
	home: {
		title: { message: 'Participant Home' },
		contactInfo: {
			title: { message: 'My Contact Info' },
			name: { message: 'Current Name' },
			enrolledTribe: { message: 'Enrolled Tribe' },
			email: { message: 'Email Address' },
			homePhone: { message: 'Home Phone' },
			workPhone: { message: 'Work Phone' },
			physicalAddress: { message: 'Physical Address' }
		},
		alternateContact: {
			title: { message: 'My Alternate Contact' },
			emergencyContactName: { message: 'Contact Name' },
			emergencyContactRelationship: { message: 'Relationship' },
			emergencyContactEmail: { message: 'Email Address' },
			emergencyContactHomePhone: { message: 'Home Phone' },
			emergencyContactWorkPhone: { message: 'Work Phone' },
			emergencyContactPhysicalAddress: { message: 'Physical Address' }
		},
		edit: {
			message: 'Edit'
		},
		todos: {
			message: 'My Todos'
		}
	},
	welcome: {
		title: {
			message: 'Hi {1}!'
		},
		description: {
			message: 'You are now a user of this app. Welcome!'
		}
	},
	todo: {}
}

export default participant
