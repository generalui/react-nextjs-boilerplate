import { useStudies } from 'hooks/api/useStudies'
import { CreateStudy } from 'partials/CreateStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyList } from 'partials/StudyList'
import { PageHeader } from 'common/PageHeader'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { studies = [], isLoading } = useStudies()

	return (
		<PageWrapper title='Studies' testId={testId}>
			<PageHeader>
				<CreateStudy />
			</PageHeader>
			<StudyList studies={studies} isLoading={isLoading} />
		</PageWrapper>
	)
}
