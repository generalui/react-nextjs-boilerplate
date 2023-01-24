import cn from 'classnames'
import { about } from 'client.config'
import Image from 'next/image'
import Link from 'next/link'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { WelcomeContentProps } from './WelcomeContent.types'

export const WelcomeContent = ({
	className,
	description,
	isParticipant = false,
	testId = 'WelcomeContent',
	title
}: WelcomeContentProps) => {
	const { image, link } = about
	const { t } = useText('client.about')

	return (
		<div data-testid={testId} className={cn('block w-full xl:w-9/12', className)}>
			<div className='flex flex-col lg:flex-row gap-4 lg:gap-5 justify-between'>
				{!isParticipant && (
					<figure className='relative w-36 md:w-40 lg:w-48 xl:w-52 h-36 md:h-40 lg:h-48 xl:h-52 flex-shrink-0'>
						<Image className='rounded-xl' layout='fill' src={image} alt={t('imageAlt')} />
					</figure>
				)}

				<div className='flex flex-col gap-4 lg:gap-2 xl:gap-3 justify-space-between'>
					<h2 className='font-bold text-3xl'>{title}</h2>
					<p>{description}</p>

					<div className='block'>
						<Button link href={link} className='w-max'>
							{t('linkLabel')}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
