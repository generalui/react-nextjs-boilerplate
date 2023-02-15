# Developing

# Prerequisites

1. [Node](https://nodejs.org/en/) `v16.13.0`.
   > If you are using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to set a compatible version based on the project [.nvmrc](./.nvmrc)
2. Yarn `npm i -g yarn`
3. Docker ([Desktop](https://www.docker.com/products/docker-desktop/))

# Getting Started

### Fork this repository

It is optional, but recommended, to fork this repository instead of cloning in order to easily rebase as this project continues to improve.

Clone your fork of this project and navigate to the containing directory.

### Create an env file

Create a file called `.env` in project's root directory. opy the contents of [.env.template](.env.template)

```sh
cp .env.template .env
```

### Install dependencies by using yarn

```sh
yarn
```

### Start up the database container.

While [Docker](https://docs.docker.com/get-docker/) is running execute the following command:

```sh
yarn run docker:db
```

This will build and compose a docker container with a PostgreSQL database. You will only need to run the `docker:db` command if the DB dies stops working between, which is not often.

### Initialize the DB

```sh
yarn prisma:migrate:dev
```

This will run the Prisma migrations found in [./prisma/migrations](./prisma/migrations) and seed the database from [./prisma/seedData/index.ts](./prisma/seedData/index.ts).

### Run the development server

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Log in with `test@email.com` and `testPassw0rd!`

# Testing

1. setup testing: `npx playwright install`
2. test: `yarn test`

# Development

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Using this starter

[NextJS](https://nextjs.org/) can be used to build Static React Apps that are deployed on a static CDN like an AWS S3 Bucket, github pages, or any static hosting provider. It can also be used as a full stack framework with a Node Express backend that serves server side rendered (SSR) react pages, that includes an API. This server implementation is optional. Static Generating is recommended for most client side only React apps.

Nextjs can be removed entirely by removing the contents of the `./src` folder, `next.config.js` and `next-env.d.ts`. Then place whatever React implementation you prefer.

# What's in the box?

- [x] [**Next.js**](https://nextjs.org/): Tried and tested React full-stack react framework.
- [x] [**Typescript**](https://www.typescriptlang.org/): Configured and ready to go. With path aliases
- [x] [**Prisma**](https://www.prisma.io/): The best Node ORM. Type safe front end to back.
- [x] [**PostgreSQL**](https://www.postgresql.org/): Ready to go database running in a docker container for easy development.
- [x] [**Docker**](https://www.postgresql.org/): docker for the the db in development and set up to export the whole project for easy shipping.
- [x] [**ReactQuery**](https://react-query-v3.tanstack.com/): API request management made super simple with hooks.
- [x] [**Tailwind**](hhttps://tailwindcss.com/): Like bootstrap, but good. A flexible styling framework that only exports the styles you use.
- [x] [**EsLint**](https://eslint.org/): linting policies configured to work with prettier and auto sort imports.
- [x] [**Jest**](https://jestjs.io/): unit tests configured with jest on front and backend.
- [x] [**Playwright**](https://playwright.dev/): Cross browser integration testing.
- [x] [**Localization routing**](https://nextjs.org/docs/advanced-features/i18n-routing): Easily add multi-language support, using Next.js' i18n routing.
- [x] [**Plop code generator**](https://plopjs.com/): Keep your code dry and modular, while improving DX.
- [x] [**React Final Form**](https://final-form.org/react): High performance subscription-based form state management for React.
- [x] [**Zod**](https://zod.dev): Validate and parse form inputs while keeping all types consistent. TypeScript-first schema validation with static type inference.
- [x] [**Husky**](https://typicode.github.io/husky/#/): Prevent bad code from being pushed with pre-commit hooks already configured to lint and test before pushing local changes.

# Folder structure breakdown

```
app
├── __tests__
│   ├── __mocks__    // mock functions
│   ├── integration  // end to end integration tests
│   └── unit         // global unit tests
├── .github  
│   └── workflows    // workflow yaml files for github actions
├── .vscode          // recommended extensions and settings for vscode
│
├── src              // the meat and potatoes of the project
│   │
│   ├── components   // all non page components
│   │   ├── layouts  // layouts used for page component templates
│   │   ├── common   // common components used throughout the app
│   │   └── <other>  // if your project uses multiple of certain types of components
│   │                // separate those into their own folders (e.g. forms, lists, cards)
│   ├── hooks        // hook functions for api and state management
│   ├── pages        // components in this folder are converted to page routes
│   │   ├── api      // used for server routes if using NextJS fullstack.
│   │   ├── _app.tsx // warps all other pages
│   │   │            // excluded from static generated sites  
│   │   └── /**/*.tsx   // nested folders create nested routes
│   ├── public       // static files (images, icons, fonts)
│   ├── store        // state management setup (hooks-for-redux)
│   ├── styles       // global project styles
│   └── utils        // shared utility functions
│
├── // The config files in the project root directory can mostly be ignored.
├── .eslintrc.js     // eslint config
├── .gitignore       // which files git ignores
├── .prettierrc.js   // code formatting rules
├── .prettierignore  // which files should not be formatted
├── jest.config.js   // unit testing config
├── jest.setup.js    // extends unit testing library
├── next-env.d.ts    // Nextjs typescript setup
├── next.config.js   // Nextjs config
├── tsconfig.json    // TS config and project absolute path config
└── package.json     // project dependencies and versioning
```

<!-- TODO: add development workflow here -->

# Test your code

Test your code! This project uses Jest tests to test individual functions and components.
This project also uses Playwright for end to end regression testing. Testing is the best form of living documentation of what your code does.

## Testing

Unit tests written with Jest + @react-testing-library.
Integration tests written in Playwright.

```
yarn test       # Run all tests
yarn test:unit  # Run unit tests
yarn test:e2e   # Run integration tets
```

# Learn More

## NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### As static react app:

A static react app generated at build time and hosted as client side only. All static content is pre-rendered on the page.

- See [static generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
- Remove `/pages/api`
- Build app with `yarn build:static`
- See [Next unsupported static features](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features)

### As fullstack framework

A fullstack Nextjs app requires the app to be hosted in on most VMs that support Node.js. This server can be used to
server-side generate pages, host api logic, and optimize page loading. This is optional.

- See [server side rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- See [api routes](https://nextjs.org/docs/api-routes/introduction)
- See [next/server](https://nextjs.org/docs/api-reference/next/server)

## State Management

This project uses [Hooks for redux](https://github.com/generalui/hooks-for-redux) for state management.
