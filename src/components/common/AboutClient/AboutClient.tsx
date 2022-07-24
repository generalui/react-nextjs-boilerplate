import cn from 'classnames'
import { about } from 'client.config'
import Image from 'next/image'
import Link from 'next/link'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { AboutClientProps } from './AboutClient.types'

/**
 * About client component
 *
 * This component requires client.config
 *
 * @param param0
 * @returns
 */
export const AboutClient = ({ className, testId = 'AboutClient' }: AboutClientProps) => {
	const { image, link } = about
	const { t } = useText('client.about')

	return (
		<div data-testid={testId} className={cn('block w-full xl:w-9/12', className)}>
			<div className='flex flex-col lg:flex-row gap-4 lg:gap-5 justify-between'>
				<figure className='relative w-48 xl:w-52 h-48 xl:h-52 flex-shrink-0'>
					<Image className='rounded-xl' layout='fill' src={image} alt={t('imageAlt')} />
				</figure>

				<div className='flex flex-col gap-4 lg:gap-2 xl:gap-3 justify-space-between'>
					<h2 className='font-bold text-3xl'>{t('title')}</h2>
					<p>{t('description')}</p>

					<div className='block'>
						<Link href={link} passHref>
							<Button link className='w-max'>
								{t('linkLabel')}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
