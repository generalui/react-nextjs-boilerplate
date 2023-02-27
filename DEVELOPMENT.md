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

The development server must be running in order to execute playwright tests.

# Development

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Pre-commit tests

This project uses husky to test code before changes are commited. This means that linting, unit, and e2e tests are run locally before changes can be commited by default. 

### Skipping pre-commit tests

Husky pre-commit scripts can be skipped by using the `--no-verify` flag, or the `-n` alias of the same flag. 

```
git commit --no-verify -m "<conventional commit message>"
or 
git commit -n -m "<conventional commit message>"
```

## Commit message format

Use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format when writing commit messages. See the [contributing guide](./CONTRIBUTING.md#commit-message-format) for more information. 

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

## Testing

Unit tests written with Jest + @react-testing-library.
Integration tests written in Playwright.

```
yarn test       # Run all tests
yarn test:unit  # Run unit tests
yarn test:e2e   # Run integration tets
```

## Using Plop Templates

This project uses plop templates to generate consistent code that is flat and modular. Running `yarn plop` will allow you to generate a component (common, partial, or page), data model, or type.
Plop will generate the appropriate code template in the appropriate folder. In the case of components plop will generate a folder with a nested component tsx, unit tests, types, and index for easier imports. In the case of pages, plop will generate the appropriate component in the `/pages` folder and `/components/pages`. 

```
yarn plop
```

You can also skip any part of the interactive menu by calling plop with the proper arguments.

```
yarn plop component common <commonComponent>
```

[Learn more about using plop](https://plopjs.com/) for generating cleaner code

# Learn More

## NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Using this starter as static react app:

A static react app generated at build time and hosted as client side only. All static content is pre-rendered on the page.

- See [static generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
- Remove `/pages/api`
- Build app with `yarn build:static`
- See [Next unsupported static features](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features)

### Using this starter as fullstack framework

A fullstack Nextjs app requires the app to be hosted in on most VMs that support Node.js. This server can be used to
server-side generate pages, host api logic, and optimize page loading. This is optional.

- See [server side rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- See [api routes](https://nextjs.org/docs/api-routes/introduction)
- See [next/server](https://nextjs.org/docs/api-reference/next/server)

## State Management

This project uses [ReactQuery](https://react-query-v3.tanstack.com/) for 99% of the state management. All api queries should be wrapped in hook with the relative model, with a reference to react query. 

[Hooks for redux](https://github.com/generalui/hooks-for-redux) is used for client side only state management. Currently this is only be used by the Multi-Step Form and may be removed in the future.

# Project Source Code Map

```
app
├── __tests__
│   ├── __mocks__    // mock functions
│   ├── integration  // end to end integration tests
│   └── unit         // global unit tests
├── .github  
│   └── workflows    // workflow yaml files for github actions
├── .vscode          // recommended extensions and settings for vscode
├── .husky
│   └── pre-commit   // actions to be executed before allowing a code push
├── .github  
│   └── workflows    // workflow yaml files for github actions
├── plop_templates   // templates for plop code generation
├── prisma
│   ├── migrations   // prisma generated database migrations
│   ├── seedData     // contains fake data in json format for seeding development database
│   ├── schema.prisma   // prisma schema file
│   └── seed.ts         // script executed to seed prisma development database
├── src
│   ├── components
│   │   ├── common      // simple components with no state management
│   │       │           // the building blocks for partials and pages
│   │   |   └── <Component>      // Component folder   
│   │   |       ├── <Component>.spec.ts      // unit test for component
│   │   |       ├── <Component>.tsx          // component JSX markup
│   │   |       ├── <Component>.types.tsx    // types used by the component
│   │   |       └── index.ts                 // generated index file to easily import
│   │   ├── partials    // complex components and model specific components (e.g. TodoForm vs Form)
│   │       │           // composed of other partials (sparingly) and common components
│   │   |   └── <Component>      // shares the same component folder structure as common
│   │   └── pages       // contains jsx mark up for pages.
│   │       │           // composed of partials and common components
│   │       └── <Component>      // shares the same component folder structure as common
│   ├── models       
│   │   └── <Model>  
│   │       ├── includes
│   │       │   └── index.ts // contains json objects to be used for prisma includes
│   │       ├── mutation
│   │       │   └── <action><Model>[By<Field>].ts  // create | update | delete actions for model optionally specified field 
│   │       ├── query
│   │       │   └── get<Model>[By<Field>].ts       // read actions for model optionally specified field 
│   │       └── <Model>.types.ts                   // model specific type references for prisma and zod validation
│   ├── pages        // components in this folder are converted to page routes
│   │   ├── api      // used for server routes if using NextJS fullstack.
│   │   │            // folders and nested files are converted into api routs via Nextjs
│   │   ├── _app.tsx       // warps all other pages (similar to create-react-app app.tsx)
│   │   ├── _document.tsx  // using by Nextjs when generating static pages
│   │   └── /**/*.tsx   // all other folders and nested files generate app page routes
│   │                   // actual markup should live in components/pages/<CorrespondingPageComponent>
│   ├── public       // static files (images, icons, fonts)
│   ├── store        // state management setup (hooks-for-redux)
│   ├── styles       // global project styles
│   ├── types        // all non-component, non-model specific types
│   └── utils        // shared utility functions
│       ├── api      // api specific utils
│       ├── client   // client side specific utils
│       └── requests // client side logic for api url requests as promises
│
├── client.config.js    // client in this case refers to the organization in which the app is being built for
│                       // contains template information for quickly changing the project
├── .babelrc            // babel config (for inlining css with Nextjs)
├── .dockerignore       // which files docker ignores
├── .env.template       // template env folder used for development !DO NOT PUT API KEYS HERE!
├── .eslintrc.js        // eslint config
├── .gitignore          // which files git ignores
├── .nvmrc              // contains recommended node version
├── .prettierignore     // which files should not be formatted
├── .prettierrc.js      // code formatting rules
├── docker-compose.yml  // docker compose to build db image (and production container if applicable)
├── Dockerfile          // docker file to build production db and webapp images
├── jest.config.js      // unit testing config
├── jest.setup.js       // extends unit testing library
├── next-env.d.ts       // Nextjs typescript setup
├── next.config.js      // Nextjs config
├── package.json        // project dependencies and versioning
├── playwright.config.ts// playwright config
├── plopfile.js         // code template generator config file
├── postcss.config.js   // post css processing config used for tailwind css
├── tsconfig.json       // TS config and project absolute path config
├── tailwind.config.js  // tailwind config
└── yarn.lock           // generated yarn.lock file
```

<!-- TODO: add development workflow here -->
