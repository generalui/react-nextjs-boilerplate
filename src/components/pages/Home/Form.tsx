import { MutableState } from 'final-form'
import { Form } from 'react-final-form'
import { OnChangeValue } from 'types/index'
import { z } from 'zod'
import { Input } from 'components/common/Input'

export const FinalForm = () => {
	const TestSchema = z.object({
		firstName: z.string(),
		lastName: z.string()
	})

	const onSubmit = async (values: z.infer<typeof TestSchema>) => {
		console.log(JSON.stringify(values))
		try {
			TestSchema.parse(values)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const handleOnChange = (value: OnChangeValue, previous: OnChangeValue) => {
		console.log('previous: ', previous)
		console.log(value)
	}

	const setFirstName = (args: any, state: MutableState<any>) => {
		const field = state.fields['firstName']
		field.change('vane')
	}

	return (
		<Form
			onSubmit={onSubmit}
			mutators={{ setFirstName }}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='firstName'>First name</label>
						<Input
							name='firstName'
							type='text'
							placeholder='First Name'
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<label htmlFor='lastName'>Last name</label>
						<Input name='lastName' type='text' placeholder='Last Name' />
					</div>
					<button type='submit'>Submit</button>
				</form>
			)}
		/>
	)
}
