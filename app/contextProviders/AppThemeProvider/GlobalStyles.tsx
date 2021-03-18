import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  .MuiMenuItem-root {
    color: ${({ theme }) => theme.themeText.themeBlack};
  }

  .Toastify__toast-container {
    top: ${NAVBAR_HEIGHT}px;

    @media only screen and (max-width: 480px) {
      width: min(92%, 350px);
      padding: 4px;
      left: auto;
      margin: 0;
    }

    .Toastify__toast {
      padding: 0;
      min-height: 0px;
      margin-bottom: 1rem !important;
      box-shadow:-5px 10px 10px rgba(0,0,0,0.2);

      .Toastify__toast-body {
        width: 100%;
        padding: 0;
        background-color: ${({ theme }) => theme.background.default};
      }
    }
  }
`

export default GlobalStyles
