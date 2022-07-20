import { useEffect } from 'react'
import { Form } from 'react-final-form'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { Icon } from 'common/Icon'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { StudyInput } from '../../../types'
import { DocumentsInput } from '../DocumentsInput'
import { ModalButton } from '../ModalButton'
import { AddStudyFilesProps } from './AddStudyFiles.types'

const modalName = 'add-files'

export const AddStudyFiles = ({
	studyId,
	className,
	testId = 'AddStudyFiles'
}: AddStudyFilesProps) => {
	const { t } = useText('studies.addFiles')
	const { close } = useModal(modalName)
	const { update } = useStudy(studyId)
	const { reset, isLoading, isSuccess } = update

	const onSubmit = async (values: Pick<StudyInput, 'documentation'>) => {
		update.mutate({ documentation: values.documentation })
	}

	useEffect(() => {
		if (!isLoading && isSuccess) {
			close()
			reset()
		}
	}, [isLoading, isSuccess, close, reset])

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name={modalName}
				modalTitle={t('title')}
				v='sm'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='xs' />
						{t('buttonLabel')}
					</>
				}
			>
				<Form
					onSubmit={onSubmit}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<DocumentsInput name='documentation' />
							<ModalFooterButtons
								isLoading={isLoading}
								modalName={modalName}
								actionButtonLabel='Upload'
							/>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
