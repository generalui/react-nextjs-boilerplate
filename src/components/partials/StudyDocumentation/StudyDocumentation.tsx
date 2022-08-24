import { useText } from 'hooks/useText'
import { AddPrivateData } from 'partials/AddPrivateData'
import { AddStudyFiles } from 'partials/AddStudyFiles'
import { DataVaultList } from 'partials/DataVaultList'
import { DocumentationList } from 'common/DocumentationList'
import { StudyDocumentationProps } from './StudyDocumentation.types'

export const StudyDocumentation = ({
	singleStudyId,
	study,
	loading,
	testId = 'StudyDocumentation'
}: StudyDocumentationProps) => {
	const { t: documentation } = useText('studies.documentation')
	const { t: dataVault } = useText('studies.dataVault')

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
			<div>
				<DataVaultList
					action={
						<AddPrivateData
							studyId={singleStudyId}
							dataTypes={study?.dataTypes}
							modalName='add-private-data'
						/>
					}
					className='flex flex-col gap-6'
					studyId={singleStudyId}
					title={dataVault('title')}
				/>
			</div>
		</>
	)
}
