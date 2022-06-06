/**
 * This file is in `.js` because it is used in the jest conifg file.
 *
 * According to the Next.JS documentation, some users might run into an error saying Failed to parse src "test-file-stub" on 'next/image'.
 *
 * If you ever run into that error, you can simply just add a / to your fileMock, like so:
 * (module.exports = "/test-file-stub")
 *
 * from: https://blog.jarrodwatts.com/how-to-set-up-nextjs-with-jest-react-testing-library-and-playwright
 */
module.exports = '/test-file-stub'
