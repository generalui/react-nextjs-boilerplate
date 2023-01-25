import { name } from 'client.config'

const common = {
	client: {
		logoAlt: { message: name }
	},
	loginMessage: {
		message:
			'Welcome to the GenUI React Starter Kit. Please login to view the live preview of the template.'
	},
	loginTestUserMessage: { message: 'Test user:' },
	userDropdown: {
		profile: {
			message: 'Profile'
		},
		logout: {
			message: 'Logout'
		},
		signIn: {
			message: 'Sign in'
		}
	},
	pages: {
		home: {
			message: 'Home'
		},
		todos: {
			message: 'Todos'
		},
		settings: {
			message: 'Settings'
		}
	},
	sidebar: {
		nav: {
			home: {
				message: 'Home'
			},
			todos: {
				message: 'Todos'
			},
			participants: {
				message: 'Participants'
			},
			settings: {
				message: 'Settings'
			},
			exportData: {
				message: 'Export Data'
			}
		}
	},
	submitButton: {
		loading: {
			message: 'Loading...'
		},
		todos: {
			message: 'Todos'
		},
		settings: {
			message: 'Settings'
		}
	},
	dataTypes: {
		analyses: {
			label: { message: 'Analyses' },
			alt: {
				message: 'Analyses data type icon'
			}
		},
		geneticData: {
			label: { message: 'Genetic Data' },
			alt: {
				message: 'Genetic data type icon'
			}
		},
		healthRecords: {
			label: { message: 'Health Records' },
			alt: { message: 'Health records data type icon' }
		},
		specimens: {
			label: { message: 'Specimens' },
			alt: {
				message: 'Specimens data type icon'
			}
		}
	},
	form: {
		actionButtons: {
			cancel: {
				message: 'Cancel'
			},
			submit: {
				message: 'Submit'
			}
		}
	},
	errors: {
		maxFileSizeExceeded: {
			message: 'Only files under {1} may be uploaded'
		},
		duplicateFileOmitted: {
			message: 'Duplicate file omitted'
		},
		generalError: {
			message: 'Something went wrong'
		}
	},
	modal: {
		cancel: { message: 'Cancel' }
	},
	pagination: {
		ariaLabel: { message: 'Pagination' },
		previous: { message: 'Previous' },
		details: { message: 'Showing {1} - {2} out of {3} total results' },
		next: { message: 'Next' }
	}
}

export default common
