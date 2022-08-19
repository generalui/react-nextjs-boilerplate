const studies = {
	title: {
		message: 'Studies'
	},
	list: {
		image: {
			message: 'Image'
		},
		studyName: {
			message: 'Study Name'
		},
		coordinator: {
			message: 'Coordinator'
		},
		submissionDate: {
			message: 'Submission Date'
		},
		status: {
			message: 'Status'
		},
		noData: {
			message: 'No data'
		}
	},
	details: {
		coordinator: { message: 'Coordinator' },
		edit: { message: 'Edit Details' },
		title: { message: 'Study Details' },
		description: { message: 'Description' },
		submissionDate: { message: 'Submission Date' },
		endDate: { message: 'End Date' },
		dataTypes: { message: 'Data Types' }
	},
	edit: {
		buttonLabel: { message: 'Edit Details' },
		submit: { message: 'Save' },
		title: { message: 'Edit Study' }
	},
	status: {
		approved: { message: 'Approved' },
		new: { message: 'New' },
		archived: { message: 'Archived' }
	},
	create: {
		success: { message: 'Study was successfully created' },
		error: { message: 'Failed to create study' }
	},
	success: {
		created: { message: 'Study was successfully created' },
		updated: { message: 'Study has been updated' }
	},
	error: {
		doesNotExist: { message: 'Study does not exist' },
		failedToUpload: { message: 'Failed to upload' },
		failedToUpdate: { message: 'Failed to update' }
	},
	documentation: {
		title: { message: 'Documentation' },
		name: { message: 'Name' },
		modified: { message: 'Modified' },
		pdfIconAlt: { message: 'PDF Icon' },
		noDocuments: { message: 'No files have been uploaded' }
	},
	dataVault: {
		title: { message: 'Data Vault' },
		dataType: { message: 'Data Type' },
		files: { message: 'Files' },
		modified: { message: 'Modified' },
		noDocuments: { message: 'No private data has been uploaded' }
	},
	files: {
		title: { message: 'Upload Files' },
		buttonLabel: { message: 'Add Public Files' },
		privateDataButtonLabel: { message: 'Add Private Data' },
		submitLabel: { message: 'Upload' }
	},
	dataTypes: {
		consents: { message: 'Consent' },
		geneticData: { message: 'Genetic Data' },
		healthRecords: { message: 'Health Records' },
		specimens: { message: 'Specimens' }
	},
	privateData: {
		buttonLabel: { message: 'Add Private Data' },
		submitLabel: { message: 'Upload' },
		modalTitle: { message: 'Add Data' },
		placeholder: { message: 'Select Data Type' },
		dataType: { message: 'Data Type' },
		filesOrFolders: { message: 'Files or Folders' },
		dropDownItems: {
			redcap: {
				alt: { message: 'REDCap Logo' },
				label: { message: 'Upload REDCap XML' }
			},
			files: {
				alt: { message: 'Document Upload Icon' },
				label: { message: 'Upload Files' }
			}
		}
	},
	redcapXMLForm: {
		title: { message: 'REDCap XML' },
		upload: {
			imageAlt: { message: 'REDCap Logo' },
			subtitle: { message: 'How do I download a REDCap project as an XML file?' },
			steps: {
				1: {
					message: 'Open your project from your “My Projects” list.'
				},
				2: {
					message: 'Select “Data Exports, Reports, and Stats” in the left hand nav.'
				},
				3: {
					message: 'Select the tab called “Other Export Options”.'
				},
				4: {
					message: 'Click on the “RedCap XML” icon to export all data.'
				},
				5: {
					message: 'REQUIRED: Click the checkbox to “Include all uploaded files and signatures.”'
				},
				6: {
					message: 'Click on “Export Entire Project (metadata and data)”.'
				}
			},
			detailsLabel: { message: 'REDCap XML Files' },
			filesSelect: { message: 'Select file to upload' },
			filesDrag: { message: 'or drag and drop here' },
			subText: { message: 'Accepts: ' },
			submit: { message: 'Import' }
		},
		parseRequiredData: {
			subtitle: { message: 'Required Data' },
			description: {
				message:
					'Required fields from the NBDC Consent Template in RedCap should be mapped automatically, and just require confirmation. '
			},
			headers: {
				fieldName: {
					message: 'NBDC Field Names(s)'
				},
				redcapFieldName: {
					message: 'RedCap Field Name(s)'
				}
			},
			inputPlaceholder: {
				message: 'Select a Field'
			},
			errors: {
				fieldsRequired: 'Required NBDC fields need to be mapped to RedCap data.'
			},
			submit: {
				message: 'Next'
			},
			cancel: { message: 'Cancel' }
		}
	}
}

export default studies
