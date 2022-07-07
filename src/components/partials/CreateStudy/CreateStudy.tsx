import { PlusIcon } from '@heroicons/react/solid'
import { memo, useEffect } from 'react'
import { StudyInput, StudySchema } from 'types/index'
import { useCreateStudy } from 'hooks/api/studies/useCreateStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { StudyForm } from 'partials/Form/StudyForm'
import { ModalButton } from 'partials/ModalButton'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const { t } = useText('createStudy')
	const { close } = useModal('create-study')
	const { createStudy, isLoading, isSuccess } = useCreateStudy()

	const onSubmit = async (values: StudyInput) => {
		if (isLoading) return

		await createStudy({ ...StudySchema.parse(values), image: values.image })
	}

	useEffect(() => {
		if (!isLoading && isSuccess) close()
	}, [isLoading, isSuccess, close])

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					name='create-study'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<PlusIcon className='w-5 h-5 mr-1 inline' /> {t('title')}
						</>
					}
				>
					<StudyForm isLoading={isLoading} onCancel={close} onSubmit={onSubmit} />
				</ModalButton>
			</div>
		</>
	)
})
