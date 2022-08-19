import cn from 'classnames'
import { useEffect } from 'react'
import { useXMLParser } from 'hooks/useParseXML'
import { JsonViewer } from 'common/JsonViewer'
import { XmlPreviewProps } from './XmlPreview.types'

// THIS PAGE IS A PROTOTYPE TO BE DISPOSED OF AFTER COMPLETION OF REDCAP XML PARSING
export const XmlPreview = ({ xmlFile, className, testId = 'XmlPreview' }: XmlPreviewProps) => {
	const { parse, parsedXML, isError, isSuccess, isParsing, isComplete } = useXMLParser()

	useEffect(() => {
		if (xmlFile && !isSuccess && !isParsing && !isComplete) parse(xmlFile)
	}, [xmlFile, parse, isSuccess, isParsing, isComplete])

	return (
		<div className='col-span-1' data-testid={testId}>
			{!parsedXML ? null : (
				<JsonViewer
					className={cn('h-56 overflow-x-scroll overflow-y-scroll', className)}
					error={isError}
					data={parsedXML}
				/>
			)}
		</div>
	)
}
