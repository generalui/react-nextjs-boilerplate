import { Icon } from '../../common/Icon'
import { ModalButton } from '../ModalButton'
import { AddStudyFilesProps } from './AddStudyFiles.types'

export const AddStudyFiles = ({ className, testId = 'AddStudyFiles' }: AddStudyFilesProps) => {
	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name='add-files'
				modalTitle='Upload Files'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='sm' />
						{'Add files'}
					</>
				}
			>
				{'hello'}
			</ModalButton>
		</div>
	)
}
