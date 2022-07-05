import Document, { Head, Html, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=optional'
						rel='stylesheet'
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default CustomDocument
