import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { Button } from 'components/common/Button'

export const FileInput = () => {
	const [selectedFile, setSelectedFile] = useState<File>()

	const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files?.length > 0) {
			setSelectedFile(event.target.files[0])
		}
	}

	const handleSubmission = async () => {
		console.log('files: ', selectedFile)
		if (selectedFile) {
			const formData = new FormData()

			formData.append('File', selectedFile)
			for (const key of formData.entries()) {
				console.log(key[0] + ', ' + key[1])
			}
			await axios
				.post('http://localhost:3000/api/documents', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((r) => {
					console.log(r)
				})
				.catch((r) => console.log(r))

			console.log('done!')
		} else {
			console.log('Select a file')
		}
	}

	return (
		<div data-testid='FileInput'>
			<label
				className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
				htmlFor='file_input'
			>
				Upload file
			</label>
			<input
				className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				id='file_input'
				type='file'
				onChange={(e) => handleFileInput(e)}
			/>
			<Button onClick={handleSubmission}>Upload file</Button>
		</div>
	)
}
