/*!
 * Study details page
 */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCombinedString } from 'utils/client/text'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useText } from 'hooks/useText'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { EditStudy } from 'partials/EditStudy'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { DocumentationList } from 'common/DocumentationList'
import { StudyStatusDropdown } from 'common/DropDown/StudyStatusDropdown'
import { Icon } from 'common/Icon'
import { Loader } from 'common/Loader'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { Detail } from './Detail'
import { StudyDetailsProps } from './StudyDetails.types'

export const StudyDetails = function StudyDetails({ testId = 'StudyDetails' }: StudyDetailsProps) {
	const router = useRouter()
	const { studyId = '' } = router.query
	const { t } = useText('studies.details')
	const { t: common } = useText('common.dataTypes')
	const { t: documentation } = useText('studies.documentation')
	const singleStudyId = getCombinedString(studyId)
	const { data: study, isLoading, isFetched, update } = useStudy(singleStudyId)

	useEffect(() => {
		if (isFetched && !study?.id) {
			router.push('/studies')
		}
	}, [isFetched, router, study, singleStudyId])

	return (
		<PageWrapper title='Studies' testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
				<StudyStatusDropdown
					className='col-span-4'
					onChange={(status) => update.mutate({ status })}
					value={study?.status || 'new'}
				/>
			</PageHeader>
			<Loader isLoading={isLoading || !study?.id}>
				{!study ? null : (
					<div className='pb-8'>
						<Card className='flex flex-col gap-6 m-4'>
							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center'>
									<div className='bg-blue-600 p-1 flex justify-center items-center rounded w-6 h-6'>
										<Icon icon='DocumentReportIcon' className='text-white' size='sm' />
									</div>
									<Text className='font-semibold text-xl'>{t('title')}</Text>
								</div>
								<EditStudy studyId={singleStudyId} />
							</div>
							<div className='flex items-center gap-6'>
								<div
									style={{
										backgroundImage: `url(${
											study.image?.image?.url || '/images/image_placeholder_centered.jpg'
										})`
									}}
									className='block h-52 w-52 bg-center bg-cover rounded-lg flex-shrink-0'
									role='img'
								/>
								<div className='flex flex-col gap-3 justify-between lg:h-52 flex-grow'>
									<div className='bg-gray-50 rounded px-4 py-2 flex-grow'>
										<Text className='text-lg font-bold line-clamp-4 md:line-clamp-none'>
											{study.title}
										</Text>
									</div>
									<div className='flex flex-col lg:flex-row gap-4 justify-between'>
										<Detail label={t('coordinator')}>{study.users[0].user.name}</Detail>
										<Detail label={t('submissionDate')}>
											{new Date(study.submissionDate).toLocaleDateString()}
										</Detail>
										<Detail label={t('endDate')}>
											{new Date(study.endDate).toLocaleDateString()}
										</Detail>
									</div>
								</div>
							</div>
							<Detail label={t('dataTypes')}>
								<DataTypeContainer
									tags={study?.dataTypes?.sort().map((dataType) => ({
										label: common(`${dataType}.label`),
										icon: `/icons/${dataType}.svg`,
										dataType
									}))}
								/>
							</Detail>
						</Card>
						<Card className='flex flex-col gap-6 m-4 '>
							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center'>
									<div className='bg-green-300 p-1 flex justify-center items-center rounded w-6 h-6'>
										<Icon icon='DocumentTextIcon' className='text-white' size='sm' />
									</div>
									<Text className='font-semibold text-xl'>{documentation('title')}</Text>
								</div>
								<Button onClick={open} center v='small'>
									<Icon icon='PlusIcon' className='text-white' size='sm' />
									{documentation('buttonLabel')}
								</Button>
							</div>
							<DocumentationList />
						</Card>
					</div>
				)}
			</Loader>
		</PageWrapper>
	)
}
