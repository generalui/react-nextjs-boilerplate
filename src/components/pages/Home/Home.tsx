import { SignInOut } from 'partials/SignInOut'
import { Button } from 'common/Button'
import { NavBar } from '../../partials/NavBar'

export const Home = () => {
	return (
		<>
			<NavBar />
			<h1>Welcome to the GenUI React Starter!</h1>

			<Button className='btn-outline btn-info'>Info</Button>
			<input type='checkbox' className='toggle toggle-accent' />
			<div className='card w-96 bg-base-100 shadow-xl'>
				<figure>
					<img src='https://api.lorem.space/image/shoes?w=400&h=225' alt='Shoes' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>Shoes!</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div className='card-actions justify-end'>
						<Button className='btn-primary'>Buy Now</Button>
					</div>
				</div>
			</div>

			<SignInOut />
		</>
	)
}
