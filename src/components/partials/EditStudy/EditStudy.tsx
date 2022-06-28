import { values } from 'lodash'
import { useSession } from 'next-auth/react'
import { memo } from 'react'
import { Study, StudyInput } from 'types/index'
import { formatFormDate } from 'utils/date'
import { createOptimisticStudyFromFormData } from 'utils/studies'
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
	const { data: session } = useSession()
	const { t } = useText('studies.edit')
	const { close } = useModal('edit-study')
	const { data: study } = useStudy(studyId)
	const {
		update: { mutate: update, isLoading, isError }
	} = useStudy(studyId)

	const onSubmit = async (values: StudyInput) => {
		if (isLoading) return

		// Create optimistic study
		const optimisticStudy: Study = createOptimisticStudyFromFormData(values, session)

		const x = await update(optimisticStudy)
		console.log(x)

		close()
	}

	if (!study) {
		// TODO: Add error handling
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
							...study,
							coordinator: study.users[0].user.email || '',
							image: study.image?.url || '',
							endDate: formatFormDate(study.endDate)
						}}
						isError={isError}
						isLoading={isLoading}
						onCancel={close}
						onSubmit={onSubmit}
						submitText={t('submit')}
					/>
				</ModalButton>
			</div>
		</>
	)
})
