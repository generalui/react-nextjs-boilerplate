import { Button } from 'components/common/Button'

const Email = () => {
	const red = {
		color: 'red'
	}
	return (
		<>
			<div>
				<h2 style={red}>Forgot password</h2>
				<p>This is a test email</p>
				<Button>Forgot password</Button>
			</div>
		</>
	)
}

export default Email
