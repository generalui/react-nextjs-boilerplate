// tests/index.spec.ts
import { expect } from '@playwright/test'
import test from './next-fixture'

test('The sign in page loads', async ({ page }) => {
	await page.goto(`/`)
	await expect(page).toHaveTitle('Sign in')
})

test('Test user can sign in', async ({ page }) => {
	await page.goto('/')

	const testUser = {
		email: 'test@email.com',
		password: 'testPassw0rd!'
	}

	await page.locator('[placeholder="Email"]').click()
	await page.locator('[placeholder="Email"]').fill(testUser.email)

	await page.locator('[placeholder="Password"]').click()
	await page.locator('[placeholder="Password"]').fill(testUser?.password || '')

	await page.locator('[data-testid="SubmitButton"]').click()

	await expect(page).toHaveTitle('GenUI')
})
