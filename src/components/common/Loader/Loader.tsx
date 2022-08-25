import cn from 'classnames'
import React, { useEffect, useState } from 'react'
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
	fallbackClassName,
	timeOut
}: LoaderProps) => {
	const [showLoading, setShowLoading] = useState<boolean>(timeOut ? false : true)

	useEffect(() => {
		let timer: NodeJS.Timeout

		if (timeOut)
			timer = setTimeout(() => {
				setShowLoading(true)
			}, timeOut * 1000)

		return () => clearTimeout(timer)
	}, [setShowLoading, timeOut])

	return (
		<>
			{isLoading && showLoading
				? React.isValidElement(fallback)
					? React.cloneElement(fallback, { className: fallbackClassName })
					: fallback
				: children}
		</>
	)
}
