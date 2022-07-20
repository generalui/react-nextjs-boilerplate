import cn from 'classnames'
import { ImageWithPlaceholderProps } from './ImageWithPlaceholder.types'

export const ImageWithPlaceholder = ({
	src,
	placeholder = '/images/image_placeholder_centered.jpg',
	className,
	testId = 'ImageWithPlaceholder'
}: ImageWithPlaceholderProps) => {
	return (
		<div
			className={cn('block h-52 w-52 bg-center bg-cover rounded-lg flex-shrink-0', className)}
			style={{
				backgroundImage: `url(${src || placeholder})`
			}}
			data-testid={testId}
			role='img'
		/>
	)
}
