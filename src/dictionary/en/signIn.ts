const signIn = {
	title: {
		message: 'Sign in'
	},
	form: {
		email: {
			label: {
				message: 'Email'
			},
			placeholder: {
				message: 'Email'
			}
		},
		password: {
			label: {
				message: 'Password'
			},
			placeholder: {
				message: 'Password'
			}
		},
		buttons: {
			submit: {
				message: 'Sign in'
			},
			createAccount: {
				message: 'Create account'
			}
		},
		errors: {
			credentialsSignin: {
				message: 'Username or password not valid.'
			},
			userAlreadyExists: {
				message: 'User with this email already exists.'
			},
			failedLogin: {
				message: 'Failed to login.'
			}
		}
	},
	stagingWarning: {
		title: { message: '⚠️ ATTENTION ⚠️' },
		description: {
			message: `This is a test deployment of the Native BioData Consortium - Consent Portal.
			Do not upload any content that can be connected to a patient's Personally Identifiable Information (PII), 
			or any content that is sensitive to HIPAA or any other regulatory agency.`
		}
	}
}

export default signIn
