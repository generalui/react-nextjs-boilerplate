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
	},
	study: {
		consent: {
			title: { message: 'Study Consent' },
			description: {
				message:
					'Your consent is gathered by a doctor or health care professional who reviews the consent form with you. The form is confidential, along with your medical records, and will not be given to anyone without your consent. Altering your consent preferences here will invoke action on behalf of the Native BioData Consortium.'
			},
			hasConsent: {
				message: 'You have consented to share your personal information with this study'
			},
			noConsent: {
				message: 'You have not consented to share your personal information with this study'
			}
		}
	}
}

export default participant
