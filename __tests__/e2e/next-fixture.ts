// tests/next-fixture.ts
import { Page, test as base } from '@playwright/test'
import { Server, createServer } from 'http'
import { rest } from 'msw'
import type { SetupServerApi } from 'msw/node'
import { AddressInfo } from 'net'
import next from 'next'
import path from 'path'
import { parse } from 'url'

// Extend base test with our fixtures.
const test = base.extend<{
	port: string
	requestInterceptor: SetupServerApi
	rest: typeof rest
	enablePreviewMode: (page: Page, base?: string) => Promise<() => Promise<void>>
}>({
	// the port function is the same as before
	port: [
		// eslint-disable-next-line no-empty-pattern
		async ({}, use) => {
			const app = next({
				dev: false,
				dir: path.resolve(__dirname, '../..')
			})
			await app.prepare()
			const handle = app.getRequestHandler()
			// start next server on arbitrary port
			const server: Server = await new Promise((resolve) => {
				const server = createServer((req, res) => {
					const parsedUrl = parse(req.url as string, true)
					handle(req, res, parsedUrl)
				})
				server.listen((error: Error) => {
					if (error) throw error
					resolve(server)
				})
			})
			const port = String((server.address() as AddressInfo).port)
			// provide port to tests
			await use(port)
		},
		{
			//@ts-ignore
			scope: 'worker',
			auto: true
		}
	],
	requestInterceptor: [
		// eslint-disable-next-line no-empty-pattern
		async ({}, use): Promise<void> => {
			// Import requestInterceptor from the built app so we
			// can attach attach our mocks to it from each test
			const { requestInterceptor } = await import('../../.next/server/pages/_app')
			await use(requestInterceptor)
		},
		{
			//@ts-ignore
			scope: 'worker'
		}
	],
	rest,
	enablePreviewMode: [
		async ({ port }, use) => {
			async function enablePreviewMode(page: Page, base = `http://localhost:${port}`) {
				await page.goto(`${base}/api/preview`)

				return async function disablePreviewMode() {
					await page.goto(`${base}/api/preview?clear`)
				}
			}

			await use(enablePreviewMode)
		},
		{
			//@ts-ignore
			scope: 'worker'
		}
	]
})
// this "test" can be used in multiple test files,
// and each of them will get the fixtures.
export default test
