import { DocumentsDropzoneProps } from './DocumentsDropzone.types'

export const DocumentsDropzone = ({
	children,
	className,
	testId = 'DocumentsDropzone'
}: DocumentsDropzoneProps) => {
	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
