import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { ReqStatus } from 'types/ReqStatus'
import { axios } from 'utils/axios'
import { useText } from 'hooks/useText'
import { Alert } from 'common/Alert'
import { AlertError } from 'common/AlertError'
import { Button } from 'common/Button'
import { FileInputProps } from './FileInput.types'

export const FileInput = ({ testId = 'FileInput' }: FileInputProps) => {
	const [selectedFile, setSelectedFile] = useState<File>()
	const [state, setUploadState] = useState<ReqStatus>(ReqStatus.NotStarted)
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
				setUploadState(ReqStatus.InProgress)

				await axios.post('/documents', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				setUploadState(ReqStatus.Ok)
				setErrors([])
			} catch (error) {
				const errors = ((error as AxiosError).response?.data as { errors: string[] })?.errors || [
					t('alerts.generalError')
				]
				setUploadState(ReqStatus.Error)
				setErrors(errors)
			}
		}
	}

	return (
		<div data-testid={testId}>
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
			{state === ReqStatus.InProgress && (
				<Alert className='mt-6' info>
					{t('alerts.inProgress')}
				</Alert>
			)}
			{state === ReqStatus.Ok && (
				<Alert className='mt-6' success>
					{t('alerts.success')}
				</Alert>
			)}

			{/* Handle errors */}
			{state === ReqStatus.Error && errors.length > 0 && (
				<div className='grid grid-cols-1 gap-4 mt-6'>
					{errors && errors.map((err) => <AlertError key={err}>{err}</AlertError>)}
				</div>
			)}
		</div>
	)
}
