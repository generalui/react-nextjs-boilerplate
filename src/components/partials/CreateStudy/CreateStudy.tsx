import { PlusIcon } from '@heroicons/react/solid'
import { memo, useState } from 'react'
import { Form } from 'react-final-form'
import { OnChangeValue } from 'types/index'
import { z } from 'zod'
import { useText } from 'hooks/useText'
import { Button } from 'components/common/Button'
import { Input } from 'components/common/Input'
import { Modal } from 'components/common/Modal'
import { TextArea } from 'components/common/TextArea'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const [open, setOpen] = useState<boolean>(false)
	const { t } = useText('createStudy')

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
				<Button onClick={handleOnClick} center>
					<PlusIcon className='w-5 h-5 mr-1 inline' /> Add Study
				</Button>
				<Modal
					show={open}
					onClose={handleOnClose}
					title={t('title')}
					footer={<Button>Decline</Button>}
					bodyClassName='pt-6'
				>
					<Form
						data-testid={testId}
						onSubmit={onSubmit}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<div className='grid grid-cols-3 gap-2'>
									<div className='row-span-3'>
										<Input name='File' type='file' placeholder='File' onChange={handleOnChange} />
									</div>
									<div className='col-span-2 row-span-2'>
										<TextArea />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='owner'>
											Owner
										</label>
										<Input name='owner' type='text' placeholder='Owner' onChange={handleOnChange} />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='date'>
											Submission Date
										</label>
										<Input name='date' type='date' placeholder='Date' onChange={handleOnChange} />
									</div>
									<label className='text-xs text-gray-500' htmlFor='date'>
										Study Description
									</label>
									<div className='col-span-3'>
										<TextArea rows={5} />
									</div>
								</div>
							</form>
						)}
					/>
				</Modal>
			</div>
		</>
	)
})
