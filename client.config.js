module.exports = {
	name: 'Native BioData Consortium',
	headerLogo: '/images/NBDC_logo_full.svg',
	signInImage: '/images/NBDC_logo_full.svg',
	favicon: '/images/nbdc_favicon.svg',
	backgroundColor: '#f1ece9',
	about: {
		title: 'Stewardship of Native BioData',
		image: 'https://nativebio.org/wp-content/uploads/2020/12/Guthrie_profile_450.png',
		imageAlt: 'NBDC steward',
		description:
			'The NBDC platform puts Tribes, and Participants of research studies, in control of their own data. The Consent Dashboard facilitates changes to consent on a study-by-study basis, and includes helpful information with each type of collected data.',
		link: 'https://nativebio.org/',
		linkLabel: 'Visit nativebio.org'
	},
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
				primary: '#0093D8',
				'primary-hover': '#0773b0',
				'primary-light': '',
				'primary-light-hover': '#27e48e',
				'primary-dark': '#222222',
				'primary-dark-hover': '#27e48e',
				'button-text-primary': '#FFFFFF',
				'button-text-secondary': '#0093D8',
				secondary: '#D5F2FF',
				'secondary-hover': '#C7E9FF',
				'secondary-dark': '#111',
				'secondary-text-dark': '#222222',
				'accent-1': 'rgb(49, 196, 141)',
				'accent-2': 'rgb(118, 169, 250)',
				'accent-3': 'rgb(249, 128, 128)',
				success: 'rgb(49, 196, 141)',
				warning: 'rgb(253, 186, 140)',
				danger: '#e74c3c',
				info: 'rgb(49, 196, 141)',
				muted: 'rgb(209, 213, 219)',
				'blue-700': '#0773b0'
			}
		}
	}
}
