import { Size } from 'flowbite-react/lib/esm/components/Rating/RatingContext'
import { CommonProps } from 'types/CommonProps'

export interface ModalWindowProps extends CommonProps {
	show: boolean
	onClose: () => void
	modalSize?: Size
}
