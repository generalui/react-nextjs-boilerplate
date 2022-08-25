export type SeedUser = {
	email: string
	name: string
	password?: string
	id?: string
	role: 'admin' | 'participant'
}

export const users: SeedUser[] = [
	{
		email: 'test@email.com',
		name: 'Test 👷',
		password: 'testPassw0rd!',
		id: 'testId',
		role: 'admin'
	},
	{
		email: 'testParticipant@email.com',
		name: 'Test Participant',
		password: 'testPassw0rd!',
		id: 'testIdParticipant',
		role: 'participant'
	},
	{
		email: 'joseph@nativebio.org',
		name: 'Joseph Yracheta',
		password: 'dr5_@jostiSA',
		role: 'admin'
	},
	{
		email: 'krystal@nativebio.org',
		name: 'Krystal Tsosie',
		password: '_9uhUStI_$03',
		role: 'admin'
	},
	{
		email: 'guthrie@nativebio.org',
		name: 'Guthrie Ducheneaux',
		password: '8opro04phL=t',
		role: 'admin'
	},
	{
		email: 'devan@genui.com',
		name: 'Dev Huapaya',
		password: 't$frLb3u$0n@',
		role: 'admin'
	},
	{
		email: 'rob@genui.com',
		name: 'Rob Brennan',
		password: 'Mi5+2Ri=LTho',
		role: 'admin'
	},
	{
		email: 'jeni@genui.com',
		name: 'Jeni Mattson',
		password: '36-RUth1v&?r',
		role: 'admin'
	},
	{
		email: 'vane@genui.com',
		name: 'Vane Nuñez',
		password: 'p9o=Heylst9f',
		role: 'admin'
	},
	{
		email: 'jase@genui.com',
		name: 'Jase Pellerin',
		password: 'Vib1si5&_rOT',
		role: 'admin'
	},
	{
		email: 'ian.lyman@genui.com',
		name: 'Ian Lyman',
		password: 'Tr4quSWu7r!n',
		role: 'admin'
	},
	{
		email: 'jonathan@nativebio.org',
		name: 'Jonathan Kim',
		password: 'che1Ra$TaQot',
		role: 'admin'
	},
	{
		email: 'justina@nativebio.org',
		name: 'Justina White Eyes',
		password: 'JeS*ACh7_H#F',
		role: 'admin'
	},
	{
		email: 'kelle@nativebio.org',
		name: 'Kelle Dhein',
		password: 'r=tL=6ZLk_Ku',
		role: 'admin'
	},
	{
		email: 'timothy@nativebio.org',
		name: 'Timothy Watkins',
		password: '&r5!aweMeWa=',
		role: 'admin'
	}
]
