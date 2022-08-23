import cn from 'classnames'
import { Loader } from 'common/Loader'
import { JsonViewerProps } from './JsonViewer.types'

export const JsonViewer = ({
	className,
	testId = 'JsonViewer',
	error,
	isLoading = false,
	data,
	loadingClassName
}: JsonViewerProps) => {
	return (
		<div data-testid={testId}>
			<pre
				className={cn(
					'h-56 overflow-x-scroll overflow-y-scroll block p-2.5 w-full text-sm text-gray-900 rounded-lg border',
					error ? 'border-danger bg-red-50' : 'border-gray-300 bg-gray-50	 dark:border-gray-600',
					className
				)}
			>
				<Loader isLoading={isLoading} fallbackClassName={cn('p-12', loadingClassName)}>
					{data ? JSON.stringify(data, null, 2) : null}
				</Loader>
			</pre>
		</div>
	)
}
