import { name } from 'client.config'

const common = {
	client: {
		logoAlt: { message: name }
	},
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
		studies: {
			message: 'Studies'
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
			studies: {
				message: 'Studies'
			},
			settings: {
				message: 'Settings'
			}
		}
	},
	submitButton: {
		loading: {
			message: 'Loading...'
		},
		studies: {
			message: 'Studies'
		},
		settings: {
			message: 'Settings'
		}
	},
	dataTypes: {
		consents: {
			label: { message: 'Consents' },
			alt: {
				message: 'Consent data type icon'
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
	errors: {
		maxFileSizeExceeded: {
			message: 'Max file size {1} exceeded'
		},
		duplicateFileOmitted: {
			message: 'Duplicate file omitted'
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
