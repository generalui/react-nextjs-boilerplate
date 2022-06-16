import { PlusIcon } from '@heroicons/react/solid'
import { memo, useState } from 'react'
import { Form } from 'react-final-form'
import { z } from 'zod'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { Modal } from 'common/Modal'
import { ModalFooter } from 'common/ModalFooter'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const [open, setOpen] = useState<boolean>(false)

	const { t } = useText('createStudy')

	const StudySchema = z.object({
		title: z.string(),
		coordinator: z.string(),
		endDate: z.string(),
		description: z.string()
	})

	const onSubmit = async (values: z.infer<typeof StudySchema>) => {
		try {
			StudySchema.parse(values)
			console.log(JSON.stringify(values))
		} catch (error) {
			console.log('error: ', error)
		}
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
				<Modal show={open} onClose={handleOnClose} title={t('title')} bodyClassName='pt-6'>
					<Form
						data-testid={testId}
						onSubmit={onSubmit}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<div className='grid grid-cols-3 gap-2'>
									<ImageInput />
									<div className='col-span-2 row-span-2'>
										<Input name='title' placeholder='Title' type='textarea' />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='coordinator'>
											Coordinator
										</label>
										<Input name='coordinator' type='text' placeholder='Coordinator' />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='endDate'>
											End Date
										</label>
										<Input name='endDate' type='date' placeholder='Select End Date' />
									</div>
									<label className='text-xs text-gray-500' htmlFor='date'>
										Study Description
									</label>
									<div className='col-span-3'>
										<Input name='description' placeholder='Description' type='textarea' rows={5} />
									</div>
									<div className='col-span-3'>
										<ModalFooter>
											<Button type='submit'>Save</Button>
											<Button>Cancel</Button>
										</ModalFooter>
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
