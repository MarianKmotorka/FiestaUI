import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  .MuiMenuItem-root {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  .Toastify__toast-container {
    top: ${NAVBAR_HEIGHT}px;

    @media only screen and (max-width: 480px) {
      width: min(92%, 350px);
      padding: 4px;
      left: auto;
      top: 1rem;
      margin: 0;
    }

    .Toastify__toast {
      padding: 0;
      min-height: 0px;
      margin-bottom: 0.2rem !important;
      box-shadow:-5px 10px 10px rgba(0,0,0,0.2);
      box-shadow:${({ theme }) => theme.shadows[15]};

      .Toastify__toast-body {
        width: 100%;
        padding: 0;
        background-color: ${({ theme }) => theme.palette.background.paper};
      }
    }
  }

  ${({ theme }) =>
    theme.palette.type === 'dark' &&
    css`
      .Mui-disabled.MuiButton-root {
        color: ${theme.palette.grey[600]};
      }
      .Mui-disabled.MuiButton-outlined {
        border-color: ${theme.palette.grey[600]};
      }
    `}
`

export default GlobalStyles
