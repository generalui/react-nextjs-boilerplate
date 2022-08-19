const participant = {
	home: {
		contactInfo: {
			title: { message: 'My Contact Info' },
			name: { message: 'Current Name' },
			enrolledTribe: { message: 'Enrolled Tribe' },
			email: { message: 'Email Address' },
			homePhone: { message: 'Home Phone' },
			workPhone: { message: 'Work Phone' },
			physicalAddress: { message: 'Physical Address' }
		},
		emergencyContact: {
			title: { message: 'My Emergency Contact' },
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
		studies: {
			message: 'My Studies'
		},
		dataVault: {
			message: 'My Data Vault'
		},
		dataVaultAction: {
			message: 'Learn More'
		}
	},
	welcome: {
		title: {
			message: 'Hi {1}!'
		},
		description: {
			message:
				'Thank you for participating! The NBDC platform helps us put Tribes, and Participants of research studies, in control of their own data by facilitating changes to consent on a study-by-study basis.'
		}
	}
}

export default participant
