This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

1. First, make sure you are using `node v16.13.0`. If you are using nvm, run `nvm use` to set a compatible version. Check out [.nvmrc](./.nvmrc)
2. Install dependencies: `yarn`
3. Start up the dev database: `yarn run docker:db` (make sure [Docker](https://docs.docker.com/get-docker/) is running)
4. Initialize the DB: `yarn prisma:migrate:dev`
5. Run the dev server: `yarn dev`
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
7. Log in with `test@email.com` and `testPassw0rd!`

# Testing

1. setup testing: `npx playwright install`
2. test: `yarn test`

# Development

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Next steps

To get started with building out your app see the [development documentation](/DEVELOPMENT.md).

# Contributing

To make a contribution or ask questions see the [contributing documentation](/CONTRIBUTING.md).
