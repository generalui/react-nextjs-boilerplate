/*!
 * Study details page
 */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { TagContainer } from 'partials/TagContainer'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
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
	const { t: studiesT } = useText('studies')
	const { t } = useText('studies.details')
	const {
		data: study,
		isLoading,
		update
	} = useStudy(Array.isArray(studyId) ? studyId.join('') : studyId)

	return (
		<PageWrapper title='Studies' testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<div className='col-span-8 flex gap-8'>
					<Link href='/studies' passHref>
						<Text className='font-bold'>{studiesT('title')}</Text>
					</Link>
					<Icon icon='ChevronRightIcon' className='text-gray-400' />
					<Text className='font-bold text-gray-400'>{t('title')}</Text>
				</div>
				<StudyStatusDropdown
					className='col-span-4'
					onChange={(status) => update.mutate({ status })}
					value={study?.status || 'new'}
				/>
			</PageHeader>
			<Loader isLoading={isLoading}>
				{!study ? null : (
					<Card className='flex flex-col gap-6'>
						<div className='flex justify-between items-center'>
							<div className='flex gap-2'>
								<div className='bg-blue-600 p-1 flex justify-center items-center rounded w-6 h-6'>
									<Icon icon='DocumentReportIcon' className='text-white' size='sm' />
								</div>
								<Text className='font-semibold text-xl'>{t('title')}</Text>
							</div>
							<Button v='small'>
								<Icon icon='PencilAltIcon' className='h-4 w-4' />
								{t('edit')}
							</Button>
						</div>
						<div className='flex items-center gap-6'>
							<div
								style={{
									backgroundImage: `url(${
										study.image?.url || '/images/image_placeholder_centered.jpg'
									})`
								}}
								className='block h-52 w-52 bg-center bg-cover rounded-lg flex-shrink-0'
								role='img'
							/>
							<div className='flex flex-col gap-3 justify-between lg:h-52'>
								<div className='bg-gray-50 rounded px-4 py-2 flex-grow'>
									<Text className='text-lg font-bold line-clamp-4 md:line-clamp-none'>
										{study.title}
									</Text>
								</div>
								<div className='flex flex-col lg:flex-row gap-4 justify-between'>
									<Detail label={t('coordinator')}>{study.users[0].user.name}</Detail>
									<Detail label={t('title')}>
										{new Date(study.submissionDate).toLocaleDateString()}
									</Detail>
									<Detail label={t('endDate')}>
										{new Date(study.endDate).toLocaleDateString()}
									</Detail>
								</div>
							</div>
						</div>
						<Detail label={t('description')}>{study.description}</Detail>
						<Detail label={t('dataTypes')}>
							<TagContainer tags={[{ label: t('consents'), icon: 'FolderIcon' }]} />
						</Detail>
					</Card>
				)}
			</Loader>
		</PageWrapper>
	)
}
