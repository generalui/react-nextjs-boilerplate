module.exports = {
	name: 'Native BioData Consortium',
	headerLogo: '/images/NBDC_logo_full.svg',
	signInImage: '/images/NBDC_logo_full.svg',
	backgroundColor: '#f1ece9',
	about: {
		title: 'Stewardship of Native BioData',
		image: 'https://nativebio.org/wp-content/uploads/2020/12/Guthrie_profile_450.png',
		imageAlt: 'NBDC steward',
		description:
			'The NBDC platform puts Tribes, and Participants of research studies, in control of their own data. The Consent Dashboard facilitates changes to consent on a study-by-study basis, and includes helpful information with each type of collected data.',
		link: 'https://nativebio.org/',
		linkLabel: 'Visit nativebiodata.org'
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
				'blue-100': '#D5F2FF',
				'blue-200': '#C7E9FF',
				'blue-600': '#0093D8',
				'blue-700': '#0773b0'
			}
		}
	}
}
