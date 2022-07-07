export const getBase64 = async (file: Blob): Promise<string | undefined> => {
	const reader = new FileReader()
	reader.readAsDataURL(file as Blob)

	return new Promise((resolve, reject) => {
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
}
