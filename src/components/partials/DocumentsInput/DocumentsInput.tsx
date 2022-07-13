import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Field } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentGrid } from 'common/DocumentGrid'
import { Dropzone } from 'common/Dropzone'
import { Icon } from 'common/Icon'
import { InputError } from 'common/InputError'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

export const DocumentsInput = ({
	className,
	name,
	onChange,
	errorClassName,
	testId = 'DocumentsInput'
}: DocumentsInputProps) => {
	const [documentFile, setDocumentFile] = useState<DocumentPreview[] | undefined>()
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const { t } = useText('createStudy.fields.documentation')
	const { t: common } = useText('common.errors')

	const handleChange = (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		const files = acceptedFiles

		const currentFiles = files
			.map((file) => {
				if (file.size > MAX_FILE_SIZE) {
					onChange?.(new Error('maxFileSizeExceeded'))
					return undefined
				} else {
					const currentFile: DocumentPreview = {
						...file,
						name: file.name,
						type: file.type,
						preview: file.type.includes('image') ? URL.createObjectURL(file) : undefined
					}
					onChange?.(file)
					return currentFile
				}
			})
			.filter((file) => file !== undefined) as DocumentPreview[]

		setDocumentFile(documentFile ? [...documentFile, ...currentFiles] : [...currentFiles])
	}

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			documentFile?.map((document) => {
				if (document.preview) URL.revokeObjectURL(document.preview)
			})
		},
		[documentFile]
	)

	return (
		<div className={cn(className)} data-testid={testId}>
			<Field name={name}>
				{({ input, meta }) => {
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					const handleChangeInner = (files: File[]) => {
						setDropzoneErrors([])

						input.onChange?.(files)
						handleChange(files)
					}

					return (
						<>
							<Dropzone
								multi
								onChange={handleChangeInner}
								onError={(error) => setDropzoneErrors([t(error.message, '5mb')])}
								className='w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed cursor-pointer overflow-y-auto p-4'
							>
								{documentFile ? (
									<DocumentGrid documents={documentFile} />
								) : (
									<div className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
										<Image src={'/icons/folder.svg'} width='40' height='30' alt={t('alt')} />
										<label className='font-bold text-blue-600'>{t('filesSelect')}</label>
										<label className='font-light text-gray-500'>{t('filesDrag')}</label>
									</div>
								)}
							</Dropzone>

							{isError && <InputError errors={[...dropzoneErrors, meta.error]} />}
						</>
					)
				}}
			</Field>
		</div>
	)
}
