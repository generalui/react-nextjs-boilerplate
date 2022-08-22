/*!
 * AddParticipants Page
 */
import { useText } from 'hooks/useText'
import { AddParticipantsCSVForm } from 'partials/AddParticipantsCSVForm'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { PageHeader } from 'common/PageHeader'
import { AddParticipantsProps } from './AddParticipants.types'

export const AddParticipants = function AddParticipants({
	testId = 'AddParticipants'
}: AddParticipantsProps) {
	const { t } = useText('studies.addParticipants')

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
			</PageHeader>

			<div>
				<AddParticipantsCSVForm />
			</div>
		</PageWrapper>
	)
}
