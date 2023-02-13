/*!
 * AddParticipants Page
 */
import { useRouter } from 'next/router'
import { useText } from 'hooks/useText'
import { AddParticipantsCSVForm } from 'partials/AddParticipantsCSVForm'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { PageHeader } from 'common/PageHeader'
import { AddParticipantsProps } from './AddParticipants.types'

// TODO: refactor to add users page

export const AddParticipants = function AddParticipants({
	testId = 'AddParticipants'
}: AddParticipantsProps) {
	const { t } = useText('todos.addParticipants')
	const { query } = useRouter()

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
			</PageHeader>

			<div>
				<AddParticipantsCSVForm todoId={query?.todoId as string} />
			</div>
		</PageWrapper>
	)
}
