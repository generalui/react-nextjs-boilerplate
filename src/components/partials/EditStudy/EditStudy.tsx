import { memo } from 'react'
import { StudyInput } from 'types/index'
import { formatFormDate } from 'utils/client/date'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { StudyForm } from 'partials/Form/StudyForm'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { EditStudyProps } from './EditStudy.types'

export const EditStudy = memo(function EditStudy({
	studyId,
	testId = 'EditStudy'
}: EditStudyProps) {
	const { t } = useText('studies.edit')
	const { t: common } = useText('common.dataTypes')
	const { close } = useModal('edit-study')
	const { data: study } = useStudy(studyId)
	const { update } = useStudy(studyId)

	const onSubmit = async (values: StudyInput) => {
		if (update.isLoading) return

		try {
			await update.mutateAsync(values)
			close()
		} catch (error) {
			// TODO: Add proper error handling
		}
	}

	if (!study) {
		// TODO: Handle case where study doesn't exist
		return null
	}

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					name='edit-study'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<Icon icon='PencilAltIcon' size='xs' />
							{t('buttonLabel')}
						</>
					}
					v='small'
				>
					<StudyForm
						initialValues={{
							coordinator: study.users[0].user.email || '',
							description: study.description,
							endDate: formatFormDate(study.endDate),
							image: study.image?.image?.url || '',
							status: study.status,
							title: study.title,
							dataTypes: study.dataTypes?.map((dataType) => ({
								label: common(`${dataType}.label`),
								value: dataType
							}))
						}}
						isLoading={update.isLoading}
						onCancel={close}
						onSubmit={onSubmit}
						submitText={t('submit')}
					/>
				</ModalButton>
			</div>
		</>
	)
})
