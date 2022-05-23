import path from 'path'

async function globalSetup() {
	process.env.PLAYWRIGHT = '1'
	if (process.env.SKIP_BUILD === '1') {
		console.log('skipping build as SKIP_BUILD is set')
	} else {
		const nextProjectPath = path.join(__dirname, '../..')
		console.log('~ path', nextProjectPath)
		const cli = await import('next/dist/cli/next-build')
		cli.nextBuild([nextProjectPath])
	}
}

export default globalSetup
