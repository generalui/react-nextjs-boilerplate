import { memo } from 'react'
import { StudyInputPreTransform, StudySchema } from 'types/index'
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
	testId = 'EditStudy',
	disabled
}: EditStudyProps) {
	const { t } = useText('studies.edit')
	const { t: common } = useText('common.dataTypes')
	const { close } = useModal('edit-study')
	const { data: study, update } = useStudy(studyId)
	const coordinator = study?.users?.[0]?.user

	const onSubmit = async (values: StudyInputPreTransform) => {
		if (update.isLoading) return

		await update.mutateAsync(StudySchema.parse(values))
		close()
	}

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					disabled={!study || disabled}
					name='edit-study'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<Icon icon='PencilSquareIcon' size='xs' />
							{t('buttonLabel')}
						</>
					}
					v='sm'
				>
					<>
						{study && (
							<StudyForm
								keepDirtyOnReinitialize
								initialValues={{
									coordinator: coordinator
										? { value: coordinator.id, label: coordinator.email }
										: undefined,
									description: study.description,
									endDate: formatFormDate(study.endDate),
									image: study.image?.image?.url || '',
									status: study.status,
									title: study.title,
									// TODO: refactor to use formatDataTypes
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
						)}
					</>
				</ModalButton>
			</div>
		</>
	)
})
