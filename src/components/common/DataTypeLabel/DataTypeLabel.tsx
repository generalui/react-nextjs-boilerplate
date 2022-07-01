import cn from 'classnames'
import Image from 'next/image'
import { DataTypeLabelProps } from './DataTypeLabel.types'

export const DataTypeLabel = ({
	children,
	className,
	img,
	testId = 'DataTypeLabel'
}: DataTypeLabelProps) => {
	return (
		<div className={cn('flex items-center gap-1 pr-2', className)} data-testid={testId}>
			<Image src={img} width='20' height='20' alt='Data type icon' />

			{children}
		</div>
	)
}
