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
			<Button className='bg-blue-600'>+ Add Study</Button>
			<List
				columns={[
					{
						key: 'name',
						className: 'col-span-6',
						contentClassName: 'font-bold text-sm text-gray-700',
						title: 'Study Name'
					},
					{
						key: 'owner',
						className: 'col-span-3',
						contentClassName: [
							'text-base text-gray-900 font-semibold',
							'text-xs font-normal text-gray-500'
						],
						title: 'Owner'
					},
					{
						key: 'submissionDate',
						className: 'col-span-2',
						contentClassName: 'text-xs font-normal text-gray-500',
						title: 'Submission Date'
					},
					{ key: 'status', className: 'col-span-1', title: 'Status' }
				]}
				data={[
					{
						name: 'Real-time PCR designs to estimate nuclear and mitochondrial DNA copy number in forensic and ancient DNA studies',
						owner: ['Neil Sims', 'email@example.com'],
						submissionDate: '07/21/2022',
						status: 'OK'
					},
					{
						name: 'Distribution of mitochondrial DNA lineages among Native American tribes of Northeastern North America',
						owner: ['Jane Williams', 'email@example.com'],
						submissionDate: '05/12/2022',
						status: 'OK'
					}
				]}
			/>
		</PageWrapper>
	)
}
