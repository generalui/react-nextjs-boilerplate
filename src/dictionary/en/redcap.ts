const redcap = {
	upload: {
		title: { message: 'Upload REDCap XML' },
		imageAlt: { message: 'REDCap Logo' },
		subtitle: { message: 'How do I download a REDCap project as an XML file?' },
		steps: {
			one: {
				number: { message: '1.' },
				text: { message: 'Open your project from your “My Projects” list.' }
			},
			two: {
				number: { message: '2.' },
				text: { message: 'Select “Data Exports, Reports, and Stats” in the left hand nav.' }
			},
			three: {
				number: { message: '3.' },
				text: { message: 'Select the tab called “Other Export Options”.' }
			},
			four: {
				number: { message: '4.' },
				text: { message: 'Click on the “RedCap XML” icon to export all data.' }
			},
			five: {
				number: { message: '5.' },
				text: {
					message: 'REQUIRED: Click the checkbox to “Include all uploaded files and signatures.”'
				}
			},
			six: {
				number: { message: '6. ' },
				text: { message: 'Click on “Export Entire Project (metadata and data)”.' }
			}
		},
		detailsLabel: { message: 'REDCap XML Files' },
		filesSelect: { message: 'Select file to upload' },
		filesDrag: { message: 'or drag and drop here' },
		import: { message: 'Import' },
		cancel: { message: 'Cancel' }
	}
}

export default redcap
