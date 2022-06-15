/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cn from 'classnames'
import { KeyboardEventHandler, useRef } from 'react'
import { Input } from 'common/Input'
import { ImageInputProps } from './ImageInput.types'

export const ImageInput = ({ className, onClick, testId = 'ImageInput' }: ImageInputProps) => {
	const imageInput = useRef<HTMLInputElement>()

	const handleOnClickImage = () => {
		imageInput.current?.click()
		onClick?.()
	}

	const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === 'Enter') {
			handleOnClickImage()
		}
	}

	return (
		<div
			className={cn('row-span-3', className)}
			data-testid={testId}
			tabIndex={0}
			role='button'
			onClick={handleOnClickImage}
			onKeyDown={handleKeyPress}
		>
			<img src='/images/uploadImage.png' alt='PCR' className='rounded' />
			<Input ref={imageInput} className='hidden' name='file' type='file' placeholder='File' />
		</div>
	)
}
