import { getQueryNumber } from 'utils/getQueryNumber'
import { useStudies } from 'hooks/api/useStudies'
import { useRouterQuery } from 'hooks/useRouterQuery'
import { CreateStudy } from 'partials/CreateStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { Pagination } from 'partials/Pagination'
import { StudyList } from 'partials/StudyList'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	const { query } = useRouterQuery('page')
	const page = getQueryNumber(query) || 1
	const { studies = [], count, isLoading } = useStudies({ page })

	return (
		<PageWrapper title='Studies' testId={testId}>
			<CreateStudy />
			<StudyList studies={studies} isLoading={isLoading} />
			<Pagination totalCount={count} visibleCount={studies.length} />
		</PageWrapper>
	)
}
