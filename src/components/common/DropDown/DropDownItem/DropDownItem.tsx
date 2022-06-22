import cn from 'classnames'
import { Button } from 'components/common/Button'
import { DropDownItemProps } from './DropDownItem.types'

export const DropDownItem = ({
	children,
	className,
	onClick,
	testId = 'DropDownItem'
}: DropDownItemProps) => {
	return (
		<Button
			onClick={onClick}
			className={cn(
				'bg-transparent hover:bg-gray-100 text-black font-normal py-2 w-full rounded-xl',
				className
			)}
			testId={testId}
		>
			{children}
		</Button>
	)
}
