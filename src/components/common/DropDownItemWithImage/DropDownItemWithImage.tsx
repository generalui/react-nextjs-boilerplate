import cn from 'classnames'
import Image from 'next/image'
import { DropDownItemWithImageProps } from './DropDownItemWithImage.types'

export const DropDownItemWithImage = ({
	src,
	alt,
	label,
	className,
	testId = 'DropDownItemWithImage'
}: DropDownItemWithImageProps) => {
	return (
		<div className={cn('flex items-center gap-1', className)} data-testid={testId}>
			<Image src={src} width={25} height={25} alt={alt} />
			{label}
		</div>
	)
}
