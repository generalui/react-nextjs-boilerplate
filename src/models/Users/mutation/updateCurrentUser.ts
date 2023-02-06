import { currentUserIncludes } from 'models/Users/includes'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleAvatarJoin } from 'utils/api/handleAvatarJoin'
import { prisma } from 'utils/api/prisma'

export const updateCurrentUser = (req: ApiRequestWithFile) => {
	return async () => {
		const session = await getSessionFromReq(req)

		const upsertImage = await handleAvatarJoin(req.file, session.userId)

		const { body } = req
		return await prisma.user.update({
			where: {
				id: session.userId
			},
			data: {
				name: body.name,
				/**
				 * TODO: a users password should not be changed through generic update route
				 */
				password: body.password,
				...upsertImage
			},
			...currentUserIncludes
		})
	}
}
