const todos = {
	title: {
		message: 'Todos'
	},
	list: {
		image: {
			message: 'Image'
		},
		todoName: {
			message: 'Todo Name'
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
		title: { message: 'Todo Details' },
		description: { message: 'Description' },
		submissionDate: { message: 'Submission Date' },
		endDate: { message: 'End Date' },
		dataTypes: { message: 'Data Types' }
	},
	edit: {
		buttonLabel: { message: 'Edit Details' },
		submit: { message: 'Save' },
		title: { message: 'Edit Todo' }
	},
	status: {
		approved: { message: 'Approved' },
		new: { message: 'New' },
		archived: { message: 'Archived' }
	},
	create: {
		success: { message: 'Todo was successfully created' },
		error: { message: 'Failed to create todo' }
	},
	success: {
		created: { message: 'Todo was successfully created' },
		updated: { message: 'Todo was successfully updated' },
		participantsAdded: { message: 'Participants have been added to the todo successfully' },
		surveyAdded: { message: 'Survey has been added to the todo successfully' }
	},
	error: {
		doesNotExist: { message: 'Todo does not exist' },
		failedToUpload: { message: 'Failed to upload' },
		failedToUpdate: { message: 'Failed to update' },
		failedToAddParticipants: { message: 'Participants could not be added to todo' },
		failedToAddSurvey: { message: 'Survey could not be added to todo' }
	},
	documentation: {
		title: { message: 'Documentation' },
		name: { message: 'Name' },
		modified: { message: 'Modified' },
		pdfIconAlt: { message: 'PDF Icon' },
		noDocuments: { message: 'No files have been uploaded' }
	},
	files: {
		title: { message: 'Upload Files' },
		buttonLabel: { message: 'Add Public Files' },
		privateDataButtonLabel: { message: 'Add Private Data' },
		submitLabel: { message: 'Upload' }
	},
	dataTypes: {
		analyses: { message: 'Analyses' },
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
			addParticipants: {
				alt: { message: 'Add Participants' },
				label: { message: 'Add Participants via CSV' }
			},
			redcap: {
				alt: { message: 'REDCap Logo' },
				label: { message: 'Upload REDCap XML' }
			},
			files: {
				alt: { message: 'Document Upload Icon' },
				label: { message: 'Upload Files' }
			},
			addSurvey: {
				alt: { message: 'Document Upload Icon' },
				label: { message: 'Add Survey' }
			}
		}
	},
	addParticipants: {
		title: { message: 'Add Participants' },
		form: {
			title: { message: 'Add Participants' },
			upload: {
				imageAlt: { message: 'Add Participants' },
				subtitle: { message: 'Upload a CSV' },
				steps: {
					1: {
						message: 'Upload a csv containing client consent information.'
					},
					2: {
						message: 'Map csv fields to participant data related to a todo.'
					},
					3: {
						message: 'Review your import.'
					}
				},
				detailsLabel: { message: 'CSV File' },
				filesSelect: { message: 'Select file to upload' },
				filesDrag: { message: 'or drag and drop here' },
				subText: { message: 'Accepts: ' },
				submit: { message: 'Import' }
			},
			parseRequiredData: {
				subtitle: { message: 'Required Data' },
				description: {
					message:
						'Required fields from the NBDC Consent Template should be mapped automatically, and just require confirmation. '
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
					required: {
						message: 'Select a Field'
					},
					optional: {
						message: 'Select a Field (optional)'
					}
				},
				errors: {
					fieldsRequired: 'Required NBDC fields need to be mapped to RedCap data.'
				},
				submit: {
					message: 'Next'
				},
				cancel: { message: 'Cancel' }
			},
			dataSummary: {
				subtitle: { message: 'Data Mapping Summary' },
				description: {
					message:
						'Upon completion of mapping your CSV data to NBDC, participants will be sent email instructions on how to access the todo details in the NBDC Consent Portal.'
				},
				aggregatedData: {
					participants: {
						message: 'Participants'
					},
					mappedFields: {
						message: 'Mapped Fields'
					},
					unmappedFields: {
						message: 'Unmapped Fields'
					}
				},
				submit: {
					message: 'Confirm & Invite Participants'
				},
				cancel: { message: 'Edit Mapping' },
				returnToTodo: {
					message: 'Return to Todo'
				},
				participantInfo: {
					description: {
						message: 'New Participant Information'
					},
					copyInformationMessage: {
						message:
							'Make a copy of this information for your records. You will not be able to access this information again.'
					},
					email: {
						message: 'Email'
					},
					password: {
						message: 'Password'
					}
				}
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
	},
	addSurvey: {
		title: { message: 'Add Survey' },
		summary: { message: 'Survey Responses Summary' },
		participantsAmount: { message: 'Amount of Participants:' },
		surveysAmount: { message: 'Amount of Surveys:' }
	}
}

export default todos