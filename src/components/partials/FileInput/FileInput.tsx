import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { axios } from 'utils/axios'
import { useText } from 'hooks/useText'
import { AlertError } from 'components/common/AlertError'
import { Button } from 'components/common/Button'
import { Alert } from 'common/Alert'

enum FileUploadEnum {
	NotStarted = 'not-started',
	Uploading = 'uploading',
	Uploaded = 'uploaded',
	Error = 'error'
}

export const FileInput = () => {
	const [selectedFile, setSelectedFile] = useState<File>()
	const [state, setUploadState] = useState<FileUploadEnum>(FileUploadEnum.NotStarted)
	const [errors, setErrors] = useState<string[]>([])
	const { t } = useText('home.uploadForm')

	const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files?.length > 0) {
			setSelectedFile(event.target.files[0])
		}
	}

	const handleSubmission = async () => {
		if (selectedFile) {
			const formData = new FormData()

			formData.append('file', selectedFile)

			try {
				setUploadState(FileUploadEnum.Uploading)

				await axios.post('/documents', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				setUploadState(FileUploadEnum.Uploaded)
				setErrors([])
			} catch (error) {
				const errors = ((error as AxiosError).response?.data as { errors: string[] })?.errors || [
					t('alerts.generalError')
				]
				setUploadState(FileUploadEnum.Error)
				setErrors(errors)
			}
		}
	}

	return (
		<div data-testid='FileInput'>
			<label
				className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
				htmlFor='file_input'
			>
				{t('title')}
			</label>
			<input
				className='mb-6 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				id='file_input'
				type='file'
				onChange={(e) => handleFileInput(e)}
			/>
			<Button className='w-full' onClick={handleSubmission}>
				{t('input.button')}
			</Button>
			{state === FileUploadEnum.Uploading && (
				<Alert className='mt-6' info>
					{t('alerts.inProgress')}
				</Alert>
			)}
			{state === FileUploadEnum.Uploaded && (
				<Alert className='mt-6' success>
					{t('alerts.success')}
				</Alert>
			)}

			{/* Handle errors */}
			{state === FileUploadEnum.Error && errors.length > 0 && (
				<div className='grid grid-cols-1 gap-4 mt-6'>
					{errors && errors.map((err) => <AlertError key={err}>{err}</AlertError>)}
				</div>
			)}
		</div>
	)
}
