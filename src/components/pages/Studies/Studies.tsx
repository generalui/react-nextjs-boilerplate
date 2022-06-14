/*!
 * Studies
 */
import { Button } from 'components/common/Button'
import { List } from 'components/partials/List'
import { PageWrapper } from 'partials/PageWrapper'
import { StudiesProps } from './Studies.types'

export const Studies = function Studies({ testId = 'Studies' }: StudiesProps) {
	return (
		<PageWrapper title='Studies' data-testid={testId} className='flex flex-col items-start gap-10'>
			<Button>+ Add Study</Button>
			<List
				columns={[
					{
						key: 'name',
						className: 'font-bold text-sm text-gray-700',
						title: 'Study Name',
						width: 6
					},
					{
						key: 'owner',
						className: 'text-base text-gray-900 font-semibold',
						title: 'Owner',
						width: 3
					},
					{
						key: 'submissionDate',
						className: 'text-xs font-normal text-gray-500',
						title: 'Submission Date',
						width: 2
					},
					{ key: 'status', title: 'Status', width: 1 }
				]}
				data={[
					{
						name: 'Real-time PCR designs to estimate nuclear and mitochondrial DNA copy number in forensic and ancient DNA studies',
						owner: (
							<div className='flex flex-col'>
								Neil Sims <div className='text-xs font-normal text-gray-500'>email@example.com</div>
							</div>
						),
						submissionDate: '07/21/2022',
						status: 'OK'
					},
					{
						name: 'Distribution of mitochondrial DNA lineages among Native American tribes of Northeastern North America',
						owner: (
							<div className='flex flex-col'>
								Jane Williams
								<div className='text-xs font-normal text-gray-500'>email@example.com</div>
							</div>
						),
						submissionDate: '05/12/2022',
						status: 'OK'
					}
				]}
			/>
		</PageWrapper>
	)
}
