import cn from 'classnames'
import { MouseEvent, useState } from 'react'
import { Button } from 'common/Button'
import { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = ({ className, testId = 'ToggleButton' }: ToggleButtonProps) => {
	const [selected, setSelected] = useState(false)

	const handleSelect = (value: unknown | undefined) => {
		const event = value as MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
		if (
			(event.currentTarget.id === 'toggleRight' && !selected) ||
			(event.currentTarget.id === 'toggleLeft' && selected)
		)
			return null
		else setSelected(!selected)
	}

	return (
		<div
			className={cn('inline-flex rounded-md shadow-sm max-w-fit', className)}
			data-testid={testId}
		>
			<Button
				v={selected ? 'selectedToggleLeft' : 'toggleLeft'}
				id='toggleLeft'
				onClick={(value) => handleSelect(value)}
			>
				{'Profile'}
			</Button>
			<Button
				v={!selected ? 'selectedToggleRight' : 'toggleRight'}
				id='toggleRight'
				onClick={(event) => handleSelect(event)}
			>
				{'Settings'}
			</Button>
		</div>
	)
}
