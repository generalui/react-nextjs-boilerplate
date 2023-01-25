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
			message: `This is a test deployment of an app used to manage sensitive data.
			Do not upload any data that can be connected to a real person, 
			or any data that is sensitive to HIPAA or any other regulatory agency.`
		}
	}
}

export default signIn
