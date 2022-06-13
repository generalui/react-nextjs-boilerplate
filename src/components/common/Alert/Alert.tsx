import cn from 'classnames'
import { AlertProps } from './Alert.types'

const VARIANTS = {
	INFO: 'text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800',
	DANGER: 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800',
	SUCCESS: 'text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800',
	WARNING: 'text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800',
	MUTED: 'text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300'
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
