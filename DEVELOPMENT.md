# Developing

This project is intended to be used to spin up a Reactjs production quality application quickly.

# Prerequisites

> Node >= 14
> yarn v1 global installation (e.g. `npm i -g yarn`) on npm

# Development Workflow

1. Clone this project to your local environment

2. Install project dependencies with `yarn install`

3. Change the project name in `package.json`

4. Make any changes you see fit to build your project.

# Using this starter

[NextJS](https://nextjs.org/) can be used to build Static React Apps that are deployed on a static CDN like an AWS S3 Bucket, github pages, or any static hosting provider. It can also be used as a full stack framework with a Node Express backend that serves server side rendered (SSR) react pages, that includes an API. This server implementation is optional. Static Generating is recommended for most client side only React apps.

Nextjs can be removed entirely by removing the contents of the `./src` folder, `next.config.js` and `next-env.d.ts`. Then place whatever React implementation you prefer.

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
│   ├── store        // state management setup (hooks-for-redux by default)
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
