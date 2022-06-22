import { CogIcon, DocumentReportIcon, HomeIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import Link from 'next/link'
import { useText } from 'hooks/useText'
import styles from './Sidebar.module.scss'
import { SidebarProps } from './Sidebar.types'

/**
 * Side bar top and height are derived from the height of the NavBar
 */
export const Sidebar = ({ testId = 'Sidebar' }: SidebarProps) => {
	const { t } = useText('common.sidebar')

	return (
		<div
			className={cn('hidden lg:block fixed left-0 bg-white z-10 h-full', styles.sideBar)}
			data-testid={testId}
		>
			<div className='px-2 sm:px-4 py-2.5 border-b'>
				<ul>
					<li className='flex items-center mb-2'>
						<Link href='/'>
							<a className=' w-full lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
								<HomeIcon className='w-5 h-5 mr-1 inline' /> {t('nav.home')}
							</a>
						</Link>
					</li>
					<li className='flex items-center mb-2'>
						<Link href='/studies'>
							<a className=' w-full lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
								<DocumentReportIcon className='w-5 h-5 mr-1 inline' /> {t('nav.studies')}
							</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className='px-2 sm:px-4 py-2.5'>
				<ul>
					<li className='flex items-center mb-2'>
						<Link href='/'>
							<a className=' w-full lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
								<CogIcon className='w-5 h-5 mr-1 inline' /> {t('nav.settings')}
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
