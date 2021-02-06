import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import red from '@material-ui/core/colors/red'

export const SM = 480
export const MD = 839
export const LG = 1024

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#007965'
    },
    secondary: {
      main: '#161d6f'
    },
    error: {
      main: red.A400
    },
    themeText: {
      black: '#000000',
      white: '#ffffff',
      themeBlack: '#000000',
      themeWhite: '#ffffff'
    },
    background: {
      default: '#ffcc29'
    },
    bg: {
      100: '#f4f4f4'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400
    }
  }
})

export const darkTheme = createMuiTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    type: 'dark',
    primary: red,
    themeText: {
      ...lightTheme.palette.themeText,
      themeBlack: '#ffffff',
      themeWhite: '#000000'
    },
    bg: {
      100: '#111111'
    }
  }
})

declare module 'styled-components' {
  export interface DefaultTheme extends Palette {}
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    bg: {
      100: string
    }
    themeText: {
      black: string
      white: string
      themeBlack: string
      themeWhite: string
    }
  }

  interface PaletteOptions {
    bg: {
      100: string
    }
    themeText: {
      black: string
      white: string
      themeBlack: string
      themeWhite: string
    }
  }
}
