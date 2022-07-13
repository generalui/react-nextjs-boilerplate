import cn from 'classnames'
import { Icon } from 'common/Icon'
import { DocumentGridProps } from './DocumentGrid.types'

export const DocumentGrid = ({
	documents,
	className,
	testId = 'DocumentGrid'
}: DocumentGridProps) => {
	return (
		<div
			className={cn('gap-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 w-full', className)}
			data-testid={testId}
		>
			{documents.map((document) => {
				return (
					<div key={document.name} className='col-span-1 flex flex-col items-center space-y-4'>
						{document.type.includes('image') ? (
							<div
								style={{ backgroundImage: `url(${document.preview})` }}
								className='block w-28 h-28 md:w-24 md:h-24 lg:w-20 lg:h-20 bg-cover bg-center rounded-md'
							/>
						) : (
							<div className='block w-28 h-28 md:w-24 md:h-24 lg:w-20 lg:h-20 flex justify-center items-center'>
								<Icon className='w-16 h-16' icon='PaperClipIcon' />
							</div>
						)}
						<label className='text-xs w-28 md:w-24 break-all w-full text-gray-500'>
							{document.name}
						</label>
					</div>
				)
			})}
		</div>
	)
}
