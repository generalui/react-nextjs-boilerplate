/*!
 * Study details page
 */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { formatDisplayDate } from 'utils/client/date'
import { getCombinedString } from 'utils/client/text'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { AddPrivateData } from 'partials/AddPrivateData'
import { AddStudyFiles } from 'partials/AddStudyFiles'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { DataVaultList } from 'partials/DataVaultList'
import { EditStudy } from 'partials/EditStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { ParticipantStudy } from 'partials/ParticipantStudy'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { DocumentationList } from 'common/DocumentationList'
import { StudyStatusDropdown } from 'common/DropDown/StudyStatusDropdown'
import { ImageWithPlaceholder } from 'common/ImageWithPlaceholder'
import { Loader } from 'common/Loader'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { StudyDetailsProps } from './StudyDetails.types'

export const StudyDetails = function StudyDetails({ testId = 'StudyDetails' }: StudyDetailsProps) {
	const router = useRouter()
	const { studyId = '' } = router.query
	const { t } = useText('studies.details')
	const { currentUser } = useCurrentUser()
	const isAdmin = currentUser?.role === 'admin'
	const { t: common } = useText('common.dataTypes')
	const { t: documentation } = useText('studies.documentation')
	const { t: dataVault } = useText('studies.dataVault')
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
				<Card
					action={isAdmin && <EditStudy studyId={singleStudyId} disabled={loading} />}
					className='flex flex-col gap-6'
					iconProps={{ icon: 'DocumentReportIcon' }}
					title={t('title')}
				>
					<div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
						<ImageWithPlaceholder src={study?.image?.image?.url} className='h-52 w-52' />
						<div className='flex flex-col gap-3 justify-between lg:h-52 flex-grow w-full'>
							<div className='bg-gray-50 rounded px-4 py-2 flex-grow'>
								<Loader isLoading={loading}>
									<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
										{study?.title}
									</Text>
								</Loader>
							</div>
							<div className='flex flex-col lg:flex-row gap-4 justify-between'>
								<Detail label={t('coordinator')}>{study?.users?.[0]?.user?.name}</Detail>
								<Detail label={t('submissionDate')}>
									{study?.submissionDate ? formatDisplayDate(study.submissionDate) : null}
								</Detail>
								<Detail label={t('endDate')}>
									{study?.endDate ? formatDisplayDate(study.endDate) : null}
								</Detail>
							</div>
						</div>
					</div>
					<Detail textColor='text-gray-500' label={t('description')}>
						{study?.description}
					</Detail>
					<Detail label={t('dataTypes')}>
						<DataTypeContainer
							tags={
								study?.dataTypes?.sort().map((dataType) => ({
									label: common(`${dataType}.label`),
									icon: `/icons/${dataType}.svg`,
									dataType
								})) || []
							}
						/>
					</Detail>
				</Card>
				{isAdmin ? (
					<>
						<DocumentationList
							action={<AddStudyFiles studyId={singleStudyId} />}
							className='flex flex-col gap-6'
							iconProps={{ icon: 'DocumentTextIcon', wrapperClass: 'bg-green-300' }}
							title={documentation('title')}
							documents={study?.documentation || []}
							isLoading={loading}
						/>
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
					</>
				) : (
					<ParticipantStudy />
				)}
			</div>
		</PageWrapper>
	)
}
