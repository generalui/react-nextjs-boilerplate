import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'

export const Home = () => {
	return (
		<PageWrapper title='Home'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
				<div className='col-span-4 md:col-span-3'>
					<Card
						className='lg:card-side'
						img='https://unsplash.com/photos/v13x0qU4afA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8d29vZCUyMGNyYWZ0aW5nfGVufDB8fHx8MTY1MzQ0NjY4NQ&force=true&w=1080'
					>
						<h1>Welcome to the Native BioData Consortium Web Portal!</h1>
						<h4>This app is currently under construction 🏗️ 🚧 👷</h4>
					</Card>
				</div>
				<div className='w-full col-span-4 md:col-span-1'>
					<Card className='h-full grid place-content-center w-full'>
						<a href='https://github.com/generalui/native-biodata-portal' target='__blank'>
							View the code here 👩‍💻
						</a>
					</Card>
				</div>
			</div>
		</PageWrapper>
	)
}
