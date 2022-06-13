import { memo, useState } from 'react'
import { Form } from 'react-final-form'
import { OnChangeValue } from 'types/index'
import { z } from 'zod'
import { Button } from 'components/common/Button'
import { Input } from 'components/common/Input'
import { Modal } from 'components/common/Modal'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const [open, setOpen] = useState<boolean>(false)

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

	const handleOnChange = (value: OnChangeValue, previousValue: OnChangeValue) => {
		console.log('previousValue: ', previousValue)
		console.log(value)
	}

	const handleOnClick = () => {
		setOpen(!open)
	}

	const handleOnClose = () => {
		setOpen(false)
	}

	return (
		<>
			<div data-testid={testId}>
				<Button onClick={handleOnClick}>Toggle modal</Button>
				<Modal
					show={open}
					onClose={handleOnClose}
					title='Add Study'
					footer={<Button>Decline</Button>}
				>
					<Form
						data-testid={testId}
						onSubmit={onSubmit}
						initialValues={{ firstName: 'Vanessa', lastName: 'Núñez' }}
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
				</Modal>
			</div>
		</>
	)
})
