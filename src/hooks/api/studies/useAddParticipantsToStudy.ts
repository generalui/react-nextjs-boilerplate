import { UseMutationResult, useMutation } from 'react-query'
import { Study } from 'types/Study'
import { AddParticipantsInput } from 'types/StudyParticipants'
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
	addParticipants: UseMutationResult<undefined, unknown, AddParticipantsInput>
} => {
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')

	const addParticipants = useMutation(
		`study-${studyId}-add-participants`,
		(participantInput: AddParticipantsInput) =>
			addParticipantsToStudy(studyId, participantInput.participants),
		{
			onSuccess: () => {
				toast(success('updated'))
				onSuccess?.()
			},
			onError: (_err, _newStudy, context?: { previousStudy: Study }) => {
				reactQueryClient.setQueryData(['studies', studyId], context?.previousStudy)
				toast(error('failedToUpdate'), 'error')
				onError?.()
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['studies', studyId])
			}
		}
	)

	return {
		addParticipants
	}
}
