// TODO: move this logic code should not have nested utils
import { Prisma } from '@prisma/client'

type StudyIncludes = { include: Prisma.StudyInclude }

export const studyDefaultIncludes = {
	include: {
		users: {
			include: {
				user: true
			}
		},
		image: {
			include: {
				image: true
			}
		},
		documentation: true
	}
}

export const studyIncludesConsent = {
	include: {
		participants: {
			include: {
				consent: true
			}
		}
	}
}

export const studySelectParticipantIds: { select: Prisma.StudySelect } = {
	select: {
		id: true,
		// Include all users in the returned object,
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}

export const studyIncludesParticipantIds: StudyIncludes = {
	include: {
		// Include all users in the returned object,
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}

export const studyIncludesParticipants: StudyIncludes = {
	include: {
		// Include all users in the returned object,
		participants: {
			include: {
				participant: {
					include: {
						_count: true
					}
				}
			}
		}
	}
}
// Included on all studies
export const studyIncludes: StudyIncludes = {
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
		documentation: {
			orderBy: {
				insertedAt: 'desc'
			}
		}
	}
}
