/*!
 * UploadRedcapXml Page
 */
import cn from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FieldInputProps, Form } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentGrid } from 'partials/DocumentsInput/DocumentGrid'
import { DocumentPreview } from 'partials/DocumentsInput/DocumentsInput.types'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Dropzone } from 'common/Dropzone'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'
import { PageHeader } from 'common/PageHeader'
import { SubmitButton } from 'common/SubmitButton'
import { Text } from 'common/Text'
// import { Detail } from '../StudyDetails/Detail'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

const maxFiles = 1
const acceptedFiles = {
	// TODO: Add correct support for file types
	'application/xml': ['.xml'] // why are .svg accepted?
}

export const UploadRedcapXml = function UploadRedcapXml({
	onChange,
	testId = 'UploadRedcapXml'
}: UploadRedcapXmlProps) {
	const [previewDocumentFiles, setPreviewDocumentFiles] = useState<DocumentPreview | undefined>()
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const { t } = useText('redcap.upload')
	const steps = ['one', 'two', 'three', 'four', 'five', 'six']
	console.log('previewDocumentFiles: ', previewDocumentFiles)

	const handleChange = (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		// Handle accepted files
		onChange?.(acceptedFiles)
		inputRef.current?.onChange(acceptedFiles)

		// Generate preview sprites
		const filePreviews = acceptedFiles.map((file) => {
			const existingPreview = previewDocumentFiles
			if (existingPreview) {
				return existingPreview
			}

			const currentFile: DocumentPreview = {
				type: file.type,
				name: file.name,
				preview: URL.createObjectURL(file)
			}

			return currentFile
		})

		setPreviewDocumentFiles(filePreviews[0])
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				{/* TODO: update breadcrumb */}
				<Breadcrumbs className='col-span-8' />
			</PageHeader>
			<div className='flex flex-col gap-6'>
				<Card className='flex flex-col gap-6'>
					<div className='flex gap-2 items-center'>
						<div className='flex justify-center items-center rounded w-8 h-8'>
							<Image src='/icons/redcap.svg' width={28} height={28} alt={t('imageAlt')} />
						</div>
						<Text className='font-semibold text-xl'>{t('title')}</Text>
					</div>
					<div>
						<Text className='font-semibold text-lg text-gray-700 line-clamp-2'>
							{t('subtitle')}
						</Text>
						<div className='mt-4 mb-6'>
							{steps.map((step) => (
								<div key={step} className='flex flex-row'>
									<Text className='text-base text-gray-700 line-clamp-2'>
										{t(`steps.${step}.number`)}
									</Text>
									&nbsp;
									<Text
										className={cn(
											'text-base text-gray-700 line-clamp-2',
											step === 'five' && 'text-red-800'
										)}
									>
										{t(`steps.${step}.text`)}
									</Text>
								</div>
							))}
						</div>
						<div>
							<Text v='subtitle' className='font-semibold mb-2'>
								{t('detailsLabel')}
							</Text>
							<Form
								onSubmit={() => {
									return
								}}
								render={() => (
									<>
										<Dropzone
											maxFiles={maxFiles}
											accept={acceptedFiles}
											className='w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed cursor-pointer overflow-y-auto p-4'
											onChange={(files: File[] | ImagePreview | Error) => {
												if (Array.isArray(files)) {
													// setDropzoneErrors([])
													handleChange(files)
												}
											}}
										>
											{previewDocumentFiles ? (
												<DocumentGrid className='justify-center' documents={previewDocumentFiles} />
											) : (
												<div className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
													<Image src={'/icons/xmlFile.svg'} width='50' height='50' alt={t('alt')} />
													<label className='font-bold text-blue-600'>{t('filesSelect')}</label>
													<label className='font-light text-gray-500'>{t('filesDrag')}</label>
												</div>
											)}
										</Dropzone>
										<div className='flex items-center pt-6 gap-4 rounded-b border-t border-gray-200 dark:border-gray-600'>
											<SubmitButton
												className='w-full justify-center md:justify-start md:w-auto'
												// isLoading={isLoading}
												disableOnLoading
											>
												{t('import')}
											</SubmitButton>
											<Button
												// onClick={onCancel}
												v='secondary'
												className='w-full justify-center md:justify-start md:w-auto'
											>
												{t('cancel')}
											</Button>
										</div>
									</>
								)}
							/>
						</div>
					</div>
				</Card>
			</div>
		</PageWrapper>
	)
}
