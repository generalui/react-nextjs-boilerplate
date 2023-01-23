import { useText } from 'hooks/useText'
import { AddStudyFiles } from 'partials/AddStudyFiles'
import { DocumentationList } from 'common/DocumentationList'
import { StudyDocumentationProps } from './StudyDocumentation.types'

export const StudyDocumentation = ({
	singleStudyId,
	study,
	loading,
	testId = 'StudyDocumentation'
}: StudyDocumentationProps) => {
	const { t: documentation } = useText('studies.documentation')

	return (
		<>
			<div data-testid={testId}>
				<DocumentationList
					action={<AddStudyFiles studyId={singleStudyId} />}
					className='flex flex-col gap-6'
					iconProps={{ icon: 'DocumentTextIcon', wrapperClass: 'bg-green-300' }}
					title={documentation('title')}
					documents={study?.documentation || []}
					isLoading={loading}
				/>
			</div>
		</>
	)
}
