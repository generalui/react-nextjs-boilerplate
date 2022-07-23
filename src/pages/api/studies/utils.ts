// TODO: move this logic code should not have nested utils

// Included on all studies
export const studyIncludes = {
	include: {
		// Include all users in the returned object,
		users: {
			include: {
				user: true
			}
		},
		// Include image as join to documents table
		image: {
			include: {
				image: true
			}
		},
		documentation: true
	}
}
