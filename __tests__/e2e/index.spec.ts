// tests/index.spec.ts
import { expect } from '@playwright/test'
import test from './next-fixture'

test('The app loads', async ({ page, port }) => {
	await page.goto(`http://localhost:${port}/`)
	const name = await page.innerText('h1')
	expect(name).toBe('Welcome to the GenUI React Starter!')
})
