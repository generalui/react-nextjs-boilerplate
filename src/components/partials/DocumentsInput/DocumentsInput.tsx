import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Field } from 'react-final-form'
import { useText } from 'hooks/useText'
import { Icon } from '../../common/Icon'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

export const DocumentsInput = ({
	className,
	name,
	onChange,
	testId = 'DocumentsInput'
}: DocumentsInputProps) => {
	const [documentFile, setDocumentFile] = useState<DocumentPreview[] | undefined>()
	const { t } = useText('createStudy.fields.documentation')

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: async (acceptedFiles: File[]) => {
			if (!acceptedFiles || !acceptedFiles.length) return

			const files = acceptedFiles

			const currentFiles = files
				.map((file) => {
					console.log('file: ', file)
					if (file.size > MAX_FILE_SIZE) {
						onChange?.(new Error('maxFileSizeExceeded'))
						return undefined
					} else {
						const currentFile: DocumentPreview = {
							...file,
							name: file.name,
							type: file.type,
							preview: URL.createObjectURL(file)
						}
						onChange?.(file)
						console.log('currentFile: ', currentFile)
						return currentFile
					}
				})
				.filter((file) => file !== undefined) as DocumentPreview[]

			setDocumentFile(documentFile ? [...documentFile, ...currentFiles] : [...currentFiles])
		}
	})

	return (
		<div className={cn(className)} data-testid={testId}>
			<Field name={name}>
				{({ input }) => (
					<div
						{...getRootProps({
							className:
								'w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed cursor-pointer overflow-y-auto p-4'
						})}
					>
						<input className='hidden' {...getInputProps()} {...input} />
						{documentFile ? (
							<div className='gap-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 w-full'>
								{documentFile.map((document) => {
									return (
										<div
											key={document.name}
											className='col-span-1 flex flex-col items-center space-y-4'
										>
											{document.type.includes('image') ? (
												<div
													style={{ backgroundImage: `url(${document.preview})` }}
													className='block w-28 h-28 md:w-24 md:h-24 lg:w-20 lg:h-20 bg-cover bg-center rounded-md'
												/>
											) : (
												<div className='block w-28 h-28 md:w-24 md:h-24 lg:w-20 lg:h-20 flex justify-center items-center'>
													<Icon className='w-16 h-16' icon='PaperClipIcon' />
												</div>
											)}
											<label className='text-xs w-28 md:w-24 break-all w-full text-gray-500'>
												{document.name}
											</label>
										</div>
									)
								})}
							</div>
						) : (
							<div className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
								<Image src={'/icons/folder.svg'} width='40' height='30' alt={t('alt')} />
								<label className='font-bold text-blue-600'>{t('filesSelect')}</label>
								<label className='font-light text-gray-500'>{t('filesDrag')}</label>
							</div>
						)}
					</div>
				)}
			</Field>
		</div>
	)
}
