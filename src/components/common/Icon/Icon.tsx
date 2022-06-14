import * as OutlinedIcons from '@heroicons/react/outline'
import * as SolidIcons from '@heroicons/react/solid'
import { IconProps } from './Icon.types'

export const Icon = ({ icon, outlined }: IconProps) => {
	const Icon = outlined ? OutlinedIcons[icon] : SolidIcons[icon]

	return <Icon className='h-6 w-6 text-white' aria-hidden='true' />
}
