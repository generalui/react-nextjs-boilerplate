# In this folder

Routes in [Next.js ](https://nextjs.org/) work differently than [React Router](https://reactrouter.com/). Essentially, all files in this folder correlate to an route on the app. With a few exceptions.

- `pages/api` acts as the router to the [Next.js api](https://nextjs.org/docs/api-routes/introduction) routes

- `pages/__app.tsx` this component acts as what you would expect for an standard `App.tsx` component. It handles wrapping each page in `Provider` or `Themeing` Properties.

- `pages/_document.tsx` this component will be used to generate the equivilant of a `public/index.html` page. Default `Head` meta tag properties that apply to every page. And inlined server side generated styles can go in this component.

## Nested routes

Nested folders create nested routes

- `pages/blog.tsx` creates a page at the route `/blog`

- `pages/blog/categories/index.tsx` creates a page at the route `/blog/categories`

## Dynamic routes

Files with named brackets create dynamic routes. These are then available through the Next router

- `pages/blog/categories/[category].tsx` will create a page at the route where the last path is a slug that can be accessed via:

  - `const {query: {category}} = useRouter()`

- `pages/blog/[articleId].tsx` will create a page at the route where the last path is a slug that can be accessed via:
  - `const {query: {articleId}} = useRouter()`

To extend these to statically generate pages based on cms content (WordPress, Contentful, Shopify, etc.) [see Next.js' documentation on getStaticPaths](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data).

## Using as as fullstack application

No additional steps, use as is.

## Using as a static _client-side only_ application

- Remove the `pages/api` directory

- Remove any instances of getServerSideProps `getServerSideProps`
