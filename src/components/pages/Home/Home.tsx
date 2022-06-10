import { Modal } from 'flowbite-react'
import { useState } from 'react'
import { useText } from 'hooks/useText'
import { Button } from 'components/common/Button'
import { CreateStudy } from 'components/partials/CreateStudy'
import { FileInput } from 'components/partials/FileInput'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'

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
						<Modal show={open} onClose={handleOnClose}>
							<Modal.Header>Terms of Service</Modal.Header>
							<Modal.Body>
								<h1>Modal 1</h1>
							</Modal.Body>
						</Modal>
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
