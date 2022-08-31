import cn from 'classnames'
import Image from 'next/image'
import { useText } from 'hooks/useText'
import { Icon } from 'common/Icon'
import { DataTypeLabelProps } from './DataTypeLabel.types'

export const DataTypeLabel = ({
	children,
	className,
	img,
	dataType,
	iconClassname,
	icon,
	size,
	testId = 'DataTypeLabel'
}: DataTypeLabelProps) => {
	const { t } = useText('common.dataType')
	return (
		<div className={cn('flex items-center gap-1', className)} data-testid={testId}>
			{img && <Image src={img} width='20' height='20' alt={t(`${dataType}.alt`)} />}
			{icon && <Icon className={iconClassname} icon={icon} size={size} />}

			{children}
		</div>
	)
}
