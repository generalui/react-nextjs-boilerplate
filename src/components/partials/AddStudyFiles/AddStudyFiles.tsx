import { Form } from 'react-final-form'
import { useText } from 'hooks/useText'
import { Icon } from 'common/Icon'
import { DocumentsInput } from '../DocumentsInput'
import { ModalButton } from '../ModalButton'
import { AddStudyFilesProps } from './AddStudyFiles.types'

export const AddStudyFiles = ({ className, testId = 'AddStudyFiles' }: AddStudyFilesProps) => {
	const { t } = useText('studies.addFiles')

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name='add-files'
				modalTitle={t('title')}
				v='small'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='xs' />
						{t('buttonLabel')}
					</>
				}
			>
				<Form
					onSubmit={() => {
						return
					}}
					render={() => <DocumentsInput name='documentation' />}
				/>
			</ModalButton>
		</div>
	)
}
