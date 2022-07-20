import { useText } from 'hooks/useText'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { AddPrivateDataProps } from './AddPrivateData.types'

export const AddPrivateData = ({
	modalName,
	className,
	testId = 'AddPrivateData'
}: AddPrivateDataProps) => {
	const { t } = useText('studies.dataVault')

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name={modalName}
				modalTitle={t('modalTitle')}
				v='sm'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='xs' />
						{t('buttonLabel')}
					</>
				}
			>
				{'test'}
			</ModalButton>
		</div>
	)
}
