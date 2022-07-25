import cn from 'classnames'
import { ImageWithPlaceholderProps } from './ImageWithPlaceholder.types'

export const ImageWithPlaceholder = ({
	src,
	placeholder = '/images/image_placeholder_centered.jpg',
	className,
	testId = 'ImageWithPlaceholder',
	alt
}: ImageWithPlaceholderProps) => {
	return (
		<div
			className={cn('block bg-center bg-cover rounded-lg flex-shrink-0', className)}
			style={{
				backgroundImage: `url(${src || placeholder})`
			}}
			data-testid={testId}
			role='img'
			title={alt}
		/>
	)
}
