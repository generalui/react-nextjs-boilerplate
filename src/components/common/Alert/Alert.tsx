import cn from 'classnames'
import { AlertProps } from './Alert.types'

const VARIANTS = {
	INFO: 'text-button-text-primary bg-info rounded-lg',
	DANGER: 'text-red-700 bg-red-100',
	SUCCESS: 'text-green-700 bg-green-100 rounded-lg',
	WARNING: 'text-yellow-700 bg-yellow-100 rounded-lg',
	MUTED: 'text-gray-700 bg-gray-100 rounded-lg  dark:text-gray-300'
}

export const Alert = ({
	children,
	className,
	info,
	danger,
	success,
	warning,
	muted,
	testId
}: AlertProps) => {
	return (
		<div
			data-testid={testId ?? 'Alert'}
			className={cn(
				'p-4 text-sm rounded-lg flex items-center',
				{
					[VARIANTS.INFO]: info,
					[VARIANTS.DANGER]: danger,
					[VARIANTS.SUCCESS]: success,
					[VARIANTS.WARNING]: warning,
					[VARIANTS.MUTED]: muted
				},
				className
			)}
			role='alert'
		>
			{children}
		</div>
	)
}
