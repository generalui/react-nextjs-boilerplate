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
			message:
				'Thank you for participating! The NBDC platform helps us put Tribes, and Participants of research todos, in control of their own data by facilitating changes to consent on a todo-by-todo basis.'
		}
	},
	todo: {
		consent: {
			title: { message: 'Todo Consent' },
			description: {
				message:
					'Your consent is gathered by a doctor or health care professional who reviews the consent form with you. The form is confidential, along with your medical records, and will not be given to anyone without your consent. Altering your consent preferences here will invoke action on behalf of the Native BioData Consortium.'
			},
			hasConsent: {
				message: 'You have consented to share your personal information with this todo'
			},
			noConsent: {
				message: 'You have not consented to share your personal information with this todo'
			},
			iconAlt: { message: 'Consent Icon' },
			dataTypes: {
				message: 'My Data this Todo can use'
			},
			consentState: {
				full: {
					message: 'Full'
				},
				partial: {
					message: 'Partial'
				},
				none: {
					message: 'No Consent'
				}
			},

			// TODO: rename this to editConsent {modal}
			modal: {
				title: {
					message: 'Edit Consent'
				},
				buttonLabel: {
					message: 'Edit Consent'
				},
				submitButton: {
					message: 'Submit'
				},
				cancelButton: {
					message: 'Cancel'
				},
				form: {
					success: {
						message: 'Successfully updated consent'
					},
					error: {
						message: 'Failed to update consent'
					},
					healthRecords: {
						title: {
							message: 'Health Records'
						},
						body: {
							message: 'This todo has permission to use health records uploaded on your behalf.'
						},
						consented: {
							message: 'Use My Data'
						},
						notConsented: {
							message: 'Do Not Use My Data'
						}
					},
					specimens: {
						title: {
							message: 'Specimens'
						},
						body: {
							message:
								'This todo has permission to use physical specimens given to NBDC on your behalf.'
						},
						consented: {
							message: 'Use My Data'
						},
						notConsented: {
							message: 'Do Not Use My Data'
						}
					},
					geneticData: {
						title: {
							message: 'Genetic Data'
						},
						body: {
							message: 'This todo has permission to use genetic data uploaded on your behalf.'
						},
						consented: {
							message: 'Use My Data'
						},
						notConsented: {
							message: 'Do Not Use My Data'
						}
					},
					analyses: {
						title: {
							message: 'Analyses'
						},
						body: {
							message: 'This todo has permission to use analyses data uploaded on your behalf.'
						},
						consented: {
							message: 'Use My Data'
						},
						notConsented: {
							message: 'Do Not Use My Data'
						}
					}
				}
			}
		}
	}
}

export default participant
