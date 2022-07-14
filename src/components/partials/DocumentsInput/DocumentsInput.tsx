import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentGrid } from 'common/DocumentGrid'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

export const DocumentsInput = ({
	className,
	name,
	onChange,
	testId = 'DocumentsInput'
}: DocumentsInputProps) => {
	const [documentFiles, setDocumentFiles] = useState<DocumentPreview[] | undefined>()
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const { t } = useText('createStudy.fields.documentation')

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
						lastModified: file.lastModified,
						name: file.name,
						size: file.size,
						type: file.type,
						webkitRelativePath: file.webkitRelativePath,
						preview: file.type.includes('image') ? URL.createObjectURL(file) : undefined
					}
					onChange?.(file)
					const duplicateFile = documentFiles?.find(
						(documentFile) => documentFile.name === currentFile.name
					)
					if (duplicateFile) return // add a Toast when file is duplicated

					return currentFile
				}
			})
			.filter((file) => file !== undefined) as DocumentPreview[]

		setDocumentFiles(documentFiles ? [...documentFiles, ...currentFiles] : [...currentFiles])
	}

	useEffect(() => {
		inputRef.current?.onChange(documentFiles)

		return () => {
			// Make sure to revoke the data uris to avoid memory leaks
			documentFiles?.map((document) => {
				if (document.preview) URL.revokeObjectURL(document.preview)
			})
		}
	}, [documentFiles])

	return (
		<div className={cn(className)} data-testid={testId}>
			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					const handleChangeInner = (files: File[]) => {
						setDropzoneErrors([])

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
								{documentFiles ? (
									<DocumentGrid documents={documentFiles} />
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
