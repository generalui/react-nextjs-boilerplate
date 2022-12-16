import { AxiosError } from 'axios'
import { UseMutateFunction, useMutation } from 'react-query'
import { Study } from 'types/Study'
import { AddParticipantsInput, NewParticipants } from 'types/StudyParticipants'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { addParticipantsToStudy } from 'utils/requests/studies'
import { useText } from 'hooks/useText'

export type UseAddParticipantsToStudyProps = {
	studyId?: string
	onSuccess?: () => void
	onError?: () => void
}
export const useAddParticipantsToStudy = ({
	studyId = '',
	onSuccess,
	onError
}: UseAddParticipantsToStudyProps): {
	mutate: UseMutateFunction<
		undefined,
		unknown,
		{
			studyId: string
			participants: {
				email: string
				name: string
			}[]
		},
		{
			previousStudy: Study
		}
	>
	data?: NewParticipants
} => {
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')

	const { mutate, data } = useMutation(
		`study-${studyId}-add-participants`,
		(participantInput: AddParticipantsInput) =>
			addParticipantsToStudy(studyId, participantInput.participants),
		{
			onSuccess: () => {
				toast(success('participantsAdded'))
				onSuccess?.()
			},
			onError: (err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)

				toast(
					(err as AxiosError<{ message: string }>)?.response?.data?.message ||
						error('failedToAddParticipants'),
					'error'
				)
				onError?.()
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return {
		mutate,
		data
	}
}
