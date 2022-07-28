// tests/index.spec.ts
import { expect } from '@playwright/test'
import { users } from 'prisma/seedData'
import test from './next-fixture'

test('The sign in page loads', async ({ page }) => {
	await page.goto(`/`)
	await expect(page).toHaveTitle('Sign in')
})

test('Test user can sign in', async ({ page }) => {
	await page.goto('/')

	const testUser = users[0]

	await page.locator('[placeholder="Email"]').click()
	await page.locator('[placeholder="Email"]').fill(testUser.email)

	await page.locator('[placeholder="Password"]').click()
	await page.locator('[placeholder="Password"]').fill(testUser?.password || '')

	await page.locator('[data-testid="SubmitButton"]').click()

	await expect(page).toHaveTitle('Home')
})
