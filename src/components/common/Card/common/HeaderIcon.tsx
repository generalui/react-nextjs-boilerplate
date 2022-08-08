import cn from 'classnames'
import { Icon } from 'common/Icon'
import { HeaderIconProps } from '../Card.types'

export const HeaderIcon = ({ icon, size, wrapperClass }: HeaderIconProps) => {
	return (
		<div
			className={cn(
				'p-2 bg-blue-600 text-white rounded flex justify-center items-center',
				wrapperClass
			)}
		>
			<Icon icon={icon} size={size} />
		</div>
	)
}
