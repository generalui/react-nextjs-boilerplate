import { Modal } from 'flowbite-react'
import { useState } from 'react'
import { useText } from 'hooks/useText'
import { Button } from 'components/common/Button'
import { CreateStudy } from 'components/partials/CreateStudy'
import { FileInput } from 'components/partials/FileInput'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { ModalWindow } from '../../common/ModalWindow'

export const Home = () => {
	const [open, setOpen] = useState<boolean>(false)

	const { t } = useText('home')

	const handleOnClick = () => {
		setOpen(!open)
	}

	const handleOnClose = () => {
		setOpen(false)
	}

	return (
		<PageWrapper title={t('title')}>
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
				<div className='col-span-4 lg:col-span-3'>
					<Card
						className='lg:card-side'
						img='https://unsplash.com/photos/v13x0qU4afA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8d29vZCUyMGNyYWZ0aW5nfGVufDB8fHx8MTY1MzQ0NjY4NQ&force=true&w=1080'
					>
						<h1>{t('welcomeHeading.title')}</h1>
						<h4>{t('welcomeHeading.description')}</h4>
					</Card>
					<CreateStudy />
					<div>
						<Button onClick={handleOnClick}>Toggle modal</Button>
						<ModalWindow show={open} onClose={handleOnClose}>
							<div>hi</div>
						</ModalWindow>
						{/* <Modal show={open} onClose={handleOnClose}>
							<Modal.Header>Terms of Service</Modal.Header>
							<Modal.Body>
								<div className='space-y-6'>
									<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
										With less than a month to go before the European Union enacts new consumer
										privacy laws for its citizens, companies around the world are updating their
										terms of service agreements to comply.
									</p>
									<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
										The European Union’s General Data Protection Regulation (G.D.P.R.) goes into
										effect on May 25 and is meant to ensure a common set of data rights in the
										European Union. It requires organizations to notify users as soon as possible of
										high-risk data breaches that could personally affect them.
									</p>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button>Decline</Button>
							</Modal.Footer>
						</Modal> */}
					</div>
				</div>
				<div className='w-full col-span-4 lg:col-span-1'>
					<div className='grid grid-cols-1 gap-6'>
						<Card className='h-full grid place-content-center w-full'>
							<a href='https://github.com/generalui/native-biodata-portal' target='__blank'>
								{t('viewCode')}
							</a>
						</Card>
						<Card className='h-full grid place-content-center w-full'>
							<FileInput />
						</Card>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
