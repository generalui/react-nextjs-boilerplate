import { memo, useEffect } from 'react'
import { StudyInputPreTransform, StudySchema } from 'types/index'
import { useCreateStudy } from 'hooks/api/studies/useCreateStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { StudyForm } from 'partials/Form/StudyForm'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const { t } = useText('createStudy')
	const { close } = useModal('create-study')
	const { createStudy, isLoading, isSuccess, reset } = useCreateStudy()

	const onSubmit = async (values: StudyInputPreTransform) => {
		if (isLoading) return
		const newStudy = {
			...StudySchema.parse(values),
			image: values.image,
			documentation: values.documentation
		}
		await createStudy(newStudy)
	}

	useEffect(() => {
		if (!isLoading && isSuccess) {
			close()
			reset()
		}
	}, [isLoading, isSuccess, close, reset])

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					name='create-study'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<Icon icon='PlusIcon' className='mr-1' /> {t('title')}
						</>
					}
				>
					<StudyForm create isLoading={isLoading} onCancel={close} onSubmit={onSubmit} />
				</ModalButton>
			</div>
		</>
	)
})
