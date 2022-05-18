import { SignInOut } from 'partials/SignInOut'

export const Home = () => {
	return (
		<>
			<h1>Testing DaisyUI</h1>

			<button className='btn btn-outline btn-info'>Info</button>
			<input type='checkbox' className='toggle toggle-accent' checked />
			<div className='card w-96 bg-base-100 shadow-xl'>
				<figure>
					<img src='https://api.lorem.space/image/shoes?w=400&h=225' alt='Shoes' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>Shoes!</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div className='card-actions justify-end'>
						<button className='btn btn-primary'>Buy Now</button>
					</div>
				</div>
			</div>

			<SignInOut />
		</>
	)
}
