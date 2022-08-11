import cn from 'classnames'
import { Loader } from 'common/Loader'
// import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
// import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
// import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'
import { JsonViewerProps } from './JsonViewer.types'

// SyntaxHighlighter.registerLanguage('json', json)

export const JsonViewer = ({
	children,
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
				// language='json'
				// style={docco}
				className={cn(
					'block p-2.5 w-full text-sm text-gray-900 rounded-lg border',
					error ? 'border-danger bg-red-50' : 'border-gray-300  dark:border-gray-600',
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
