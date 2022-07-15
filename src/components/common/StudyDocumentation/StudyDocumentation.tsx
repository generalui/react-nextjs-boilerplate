import { useText } from 'hooks/useText'
import { Detail } from 'pages/StudyDetails/Detail'
import { StudyDocumentationProps } from './StudyDocumentation.types'

export const StudyDocumentation = ({
	className,
	testId = 'StudyDocumentation'
}: StudyDocumentationProps) => {
	const { t } = useText('studies.documentation')

	return (
		<div className={className} data-testid={testId}>
			<Detail
				label={
					<div className='flex justify-between'>
						<div>{t('name')}</div>
						<div>{t('modified')}</div>
					</div>
				}
			></Detail>
		</div>
	)
}
