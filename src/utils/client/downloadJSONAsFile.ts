export const downloadJSONAsFile = (jsonData: Record<string, unknown>, fileName = 'my-file') => {
	// Create file in browser
	const json = JSON.stringify(jsonData, null, 2)
	const blob = new Blob([json], { type: 'application/json' })
	const href = URL.createObjectURL(blob)

	// Create "a" HTML element with href to file
	const link = document.createElement('a')
	link.href = href
	link.download = fileName + '.json'
	document.body.appendChild(link)
	link.click()

	// Clean up "a" element & remove ObjectURL
	document.body.removeChild(link)
	URL.revokeObjectURL(href)
}
