module.exports = {
	name: 'GenUI',
	headerLogo: '/images/genui_logo.svg',
	signInImage: '/images/genui_logo.svg',
	favicon: '/images/genui_logo.svg',
	about: {
		title: 'GenUI React Development Kit',
		image: '/images/fist_bump.jpg',
		imageAlt: 'NBDC steward',
		description:
			'This project template was engineered to get your GenUI project up and running in no time!',
		link: 'https://github.com/generalui/react-nextjs-boilerplate',
		linkLabel: 'Read the readme'
	},
	backgroundColor: 'rgba(0, 0, 0, 0.039)',
	tailwindTheme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#474747'
					}
				}
			},
			colors: {
				primary: '#37f49e',
				'primary-hover': '#27e48e',
				'primary-light': '',
				'primary-light-hover': '#27e48e',
				'primary-dark': '#222222',
				'primary-dark-hover': '#27e48e',
				'button-text-primary': '#222222',
				'button-text-secondary': '#FFFFFF',
				secondary: '#222',
				'secondary-hover': '#222',
				'secondary-dark': '#111',
				'secondary-text-dark': '#222222',
				'accent-1': 'rgb(49, 196, 141)',
				'accent-2': 'rgb(118, 169, 250)',
				'accent-3': 'rgb(249, 128, 128)',
				success: '#37f49e',
				warning: 'rgb(253, 186, 140)',
				danger: '#e74c3c',
				info: 'rgb(49, 196, 141)',
				muted: 'rgb(209, 213, 219)'
				// You can also edit tail wind colors here e.g. `'blue-600': 'green'
				// This is not recommended.
				// Use primary, secondary, or add a relevant named color that can easily changed.
			}
		}
	}
}
