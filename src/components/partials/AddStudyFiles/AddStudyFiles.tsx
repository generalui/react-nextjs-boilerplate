// TODO: Rename this component to AddStudyDocumentation
import { useEffect } from 'react'
import { Form } from 'react-final-form'
import { StudyInput, publicFilesSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { AddStudyFilesProps } from './AddStudyFiles.types'

const modalName = 'add-files'

export const AddStudyFiles = ({
	studyId,
	className,
	testId = 'AddStudyFiles'
}: AddStudyFilesProps) => {
	const { t } = useText('studies.files')
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
					validate={(values) => handleValidate(values, publicFilesSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<DocumentsInput name='documentation' />
							<ModalFooterButtons
								isLoading={isLoading}
								modalName={modalName}
								actionButtonLabel={t('submitLabel')}
							/>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
