import cn from 'classnames'
import { useEffect } from 'react'
import { CommonProps } from 'types/CommonProps'
import { useXMLParser } from 'hooks/useParseXML'
import { JsonViewer } from 'common/JsonViewer'

type XMLPreviewProps = CommonProps & { xmlFile?: File }

// THIS PAGE IS A PROTOTYPE TO BE DISPOSED OF AFTER COMPLETION OF REDCAP XML PARSING
export const XMLPreview = ({ xmlFile, className }: XMLPreviewProps) => {
	const { parse, parsedXML, isError, isSuccess, isParsing, isComplete } = useXMLParser()

	useEffect(() => {
		if (xmlFile && !isSuccess && !isParsing && !isComplete) parse(xmlFile)
	}, [xmlFile, parse, isSuccess, isParsing, isComplete])

	return !parsedXML ? null : (
		<div className='col-span-1'>
			<JsonViewer
				className={cn('h-56 overflow-x-scroll overflow-y-scroll', className)}
				error={isError}
				data={parsedXML}
			/>
		</div>
	)
}
