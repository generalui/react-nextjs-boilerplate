import cn from 'classnames'
import { MouseEvent, useState } from 'react'
import { Button } from 'common/Button'
import { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = ({
	activeLabel,
	inactiveLabel,
	className,
	testId = 'ToggleButton'
}: ToggleButtonProps) => {
	const [active, setActive] = useState(false)

	const handleActive = (value: unknown | undefined) => {
		const event = value as MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
		if (
			(event.currentTarget.id === 'inactiveButton' && !active) ||
			(event.currentTarget.id === 'activeButton' && active)
		)
			return null
		else setActive(!active)
	}

	return (
		<div
			className={cn('inline-flex rounded-md shadow-sm max-w-fit', className)}
			data-testid={testId}
		>
			<Button
				v={active ? 'selectedToggleLeft' : 'toggleLeft'}
				id='activeButton'
				onClick={(value) => handleActive(value)}
			>
				{activeLabel}
			</Button>
			<Button
				v={!active ? 'selectedToggleRight' : 'toggleRight'}
				id='inactiveButton'
				onClick={(event) => handleActive(event)}
			>
				{inactiveLabel}
			</Button>
		</div>
	)
}
