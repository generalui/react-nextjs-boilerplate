import { useStudies } from 'hooks/api/useStudies'
import { CreateStudy } from 'partials/CreateStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { Pagination } from 'partials/Pagination'
import { StudyList } from 'partials/StudyList'
import { PageContainer } from 'common/PageContainer'
import { PageHeader } from 'common/PageHeader'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { studies = [], isLoading } = useStudies()

	return (
		<PageWrapper title='Studies' testId={testId}>
			<CreateStudy />
			<StudyList studies={studies} isLoading={isLoading} />
			<Pagination />
		</PageWrapper>
	)
}
