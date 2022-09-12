import cn from 'classnames'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { Button } from 'common/Button'
import { InputError } from 'common/InputError'
import { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = ({
	activeLabel,
	inactiveLabel,
	name,
	className,
	testId = 'ToggleButton'
}: ToggleButtonProps) => {
	const [active, setActive] = useState(false)
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()

	const handleActive = (value: unknown | undefined) => {
		const event = value as MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
		if (
			(event.currentTarget.id === 'inactiveButton' && !active) ||
			(event.currentTarget.id === 'activeButton' && active)
		)
			return null
		else setActive(!active)

		inputRef.current?.onChange(active)
	}

	useEffect(() => {
		inputRef.current?.onChange(active)
	}, [active])

	return (
		<>
			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = meta.error && meta.touched

					return (
						<div
							className={cn('inline-flex rounded-md shadow-sm max-w-fit', className)}
							data-testid={testId}
							{...input}
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

							{isError && (
								<InputError className='mt-5 absolute bottom-[-1.5rem] left-0' errors={meta.error} />
							)}
						</div>
					)
				}}
			</Field>
		</>
	)
}
