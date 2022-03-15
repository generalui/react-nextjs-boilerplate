import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { typography } from 'styles/typography'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${typography}

  // You can continue writing global styles here
  body {
    padding: 0;
  }
`
