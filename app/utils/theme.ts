import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import red from '@material-ui/core/colors/red'

export const SM = 400
export const MD = 750
export const LG = 1024

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ff4444'
    },
    secondary: {
      main: '#2c2c2c'
    },
    error: {
      main: red.A400
    },
    themeText: {
      black: '#000000',
      white: '#ffffff',
      gray: '#444444',
      themeBlack: '#000000',
      themeWhite: '#ffffff'
    },
    background: {
      default: '#fcfcfc'
    },
    bg: {
      100: '#fcfcfc'
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
      gray: string
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
      gray: string
      themeBlack: string
      themeWhite: string
    }
  }
}
