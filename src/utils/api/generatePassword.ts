// The following code is based on this example
// https://www.tutorialstonight.com/password-generator-in-javascript

type Keys = {
	upperCase: string
	lowerCase: string
	number: string
	symbol: string
}

const keys: Keys = {
	upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowerCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	number: '0123456789',
	symbol: '!@#$%^&*()_+~\\`|}{[]:;?><,./-='
}

type GetKey = {
	key: keyof Keys
	get: () => string
}
const getKey: GetKey[] = [
	{
		key: 'upperCase',
		get: function upperCase() {
			return keys.upperCase[Math.floor(Math.random() * keys.upperCase.length)]
		}
	},
	{
		key: 'lowerCase',
		get: function lowerCase() {
			return keys.lowerCase[Math.floor(Math.random() * keys.lowerCase.length)]
		}
	},
	{
		key: 'number',
		get: function number() {
			return keys.number[Math.floor(Math.random() * keys.number.length)]
		}
	},
	{
		key: 'symbol',
		get: function symbol() {
			return keys.symbol[Math.floor(Math.random() * keys.symbol.length)]
		}
	}
]

export const generatePassword = (length = 10) => {
	let password = ''
	const keySet: Record<keyof Keys, boolean> = {
		upperCase: false,
		lowerCase: false,
		number: false,
		symbol: false
	}

	// While password is less than the minimum length add random characters
	while (length - Object.keys(keySet).length > password.length) {
		const keyToAdd = getKey[Math.floor(Math.random() * getKey.length)]
		keySet[keyToAdd.key] = true
		password += keyToAdd.get()
	}

	// Make sure remaining required keys have been set
	Object.entries(keySet).forEach(([k, keySet], i) => {
		if (!keySet) {
			const keyToAdd = getKey.find(({ key }) => key === k)?.get()
			if (keyToAdd) password += keyToAdd
		}
	})

	return password
}
