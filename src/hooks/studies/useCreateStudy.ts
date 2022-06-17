import { useMutation } from 'react-query'
import { StudyInput } from 'types/index'
import { axios } from 'utils/axios'

export function useCreateStudy() {
	const { mutate, ...mutation } = useMutation((newStudy: StudyInput) => {
		return axios.post('/studies', newStudy)
	})

	return { createStudy: mutate, ...mutation }
}
