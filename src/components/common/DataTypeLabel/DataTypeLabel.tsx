import cn from 'classnames'
import Image from 'next/image'
import { useText } from 'hooks/useText'
import { DataTypeLabelProps } from './DataTypeLabel.types'

export const DataTypeLabel = ({
	children,
	className,
	img,
	dataType,
	testId = 'DataTypeLabel'
}: DataTypeLabelProps) => {
	const { t } = useText('common.dataType')
	return (
		<div className={cn('flex items-center gap-1', className)} data-testid={testId}>
			<Image src={img} width='20' height='20' alt={t(`${dataType}.alt`)} />

			{children}
		</div>
	)
}
