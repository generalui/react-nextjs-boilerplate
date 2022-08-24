/*!
 * Study details page
 */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCombinedString } from 'utils/client/text'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { StudyConsent } from 'partials/StudyConsent'
import { StudyDocumentation } from 'partials/StudyDocumentation'
import { StudyInfo } from 'partials/StudyInfo'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { StudyStatusDropdown } from 'common/DropDown/StudyStatusDropdown'
import { PageHeader } from 'common/PageHeader'
import { StudyDetailsProps } from './StudyDetails.types'

export const StudyDetails = function StudyDetails({ testId = 'StudyDetails' }: StudyDetailsProps) {
	const router = useRouter()
	const { studyId = '' } = router.query
	const { t } = useText('studies.details')
	const { currentUser } = useCurrentUser()
	const isAdmin = currentUser?.role === 'admin'
	const singleStudyId = getCombinedString(studyId)
	const { data: study, isLoading, isFetched, update } = useStudy(singleStudyId)
	const loading = !isFetched || isLoading

	useEffect(() => {
		if (isFetched && !study?.id) {
			router.push('/studies')
		}
	}, [isFetched, router, study, singleStudyId])

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
				{isAdmin && (
					<StudyStatusDropdown
						className='col-span-4'
						onChange={(status) => update.mutate({ status })}
						value={study?.status || 'new'}
					/>
				)}
			</PageHeader>

			<div className='flex flex-col gap-6'>
				<StudyInfo
					isAdmin={isAdmin}
					singleStudyId={singleStudyId}
					loading={loading}
					study={study}
				/>
				{isAdmin ? (
					<StudyDocumentation singleStudyId={singleStudyId} loading={loading} study={study} />
				) : (
					<StudyConsent />
				)}
			</div>
		</PageWrapper>
	)
}
