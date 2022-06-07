import styles from './tailwind.min'

const Email = () => {
	const red = {
		color: 'red'
	}
	return (
		<>
			{/* <style>{styles}</style> */}
			<style>{'.sendgrid-text-red{ color: red; }'}</style>
			<div>
				<h2 className='sendgrid-text-red' style={red}>
					Forgot password
				</h2>
				<p>This is a test email</p>
				<button>Forgot password</button>
			</div>
		</>
	)
}

export default Email
