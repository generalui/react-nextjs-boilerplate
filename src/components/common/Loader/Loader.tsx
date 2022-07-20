import cn from 'classnames'
import React from 'react'
import { CommonProps } from 'types/CommonProps'
import { Spinner } from 'common/Spinner'
import { LoaderProps } from './Loader.types'

const DefaultLoaderFallback = ({ className }: CommonProps) => (
	<div className={cn('flex w-full h-full justify-center items-center', className)}>
		<Spinner />
	</div>
)

export const Loader = ({
	children,
	fallback = <DefaultLoaderFallback />,
	isLoading,
	fallbackClassName
}: LoaderProps) => {
	return (
		<>
			{isLoading
				? React.isValidElement(fallback)
					? React.cloneElement(fallback, { className: fallbackClassName })
					: fallback
				: children}
		</>
	)
}
