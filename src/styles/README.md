This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

## Adding a new value to an existing style constant

Adding a new value in any existing file from `/styles/constants`  will be automatically added as a global CSS variable

## Adding a new style constant

### If the constant is a string:

1. Add a new file to `/styles/constants`

`/styles/constants/colors.ts`:
```
const COLORS = {
	primary: '#5987EB',
	secondary: '#BE78F0'
}

export default COLORS
```

2. Export constant to `/styles/constants/index.ts`

`/styles/constants/index.ts`:
```
export { default as COLORS } from './colors'
```

3. Import constant in `/styles/constants/globalStyles.ts`

`/styles/constants/globalStyles.ts`:

```
import { COLORS } from './constants'
```

4. Call `createCSSVariables` function inside the html tag

`/styles/constants/globalStyles.ts`:

```
html{
    ${createCSSVariables('colors', COLORS)}
}
```

5. This will create the following variables:

```
--colors-primary: #5987EB;
--colors-secondary: #BE78F0;
```

### If the constant is a number:

1. Add a new file to `/styles/constants`

`/styles/constants/sizes.ts`:
```
const SIZES = {
    sm: 10,
    md: 20,
    lg: 30
}

export default SIZES
```

2. Export constant to `/styles/constants/index.ts`

`/styles/constants/index.ts`:
```
export { default as SIZES } from './sizes'
```

3. Import constant in `/styles/constants/globalStyles.ts`

`/styles/constants/globalStyles.ts`:

```
import { SIZES } from './constants'
```

4. Call `createCSSVariables` function inside the html tag

`/styles/constants/globalStyles.ts`:

```
html{
    ${createCSSVariables('sizes', SIZES, 'rem')}
}
```

5. This will create the following variables:

```
--sizes-sm: 10rem;
--sizes-md: 20rem;
--sizes-lg: 30rem;
```
