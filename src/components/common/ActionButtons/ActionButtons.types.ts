import { CommonProps } from 'types/CommonProps'
import { BaseFormProps } from 'partials/Form/Form.types'
import { buttonVariants } from 'common/Button/variants'

export interface ActionButtonsProps
	extends CommonProps,
		Partial<BaseFormProps<Record<string, unknown>>> {
	localizationScope?: string
	submitVariant?: keyof typeof buttonVariants
	submitText?: string
	cancelText?: string
	onSubmit?: () => void
}
