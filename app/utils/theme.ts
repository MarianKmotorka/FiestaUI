import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import red from '@material-ui/core/colors/red'

export const SM = 400
export const MD = 700
export const LG = 900
export const XLG = 1024

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fe2c55'
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
    themeText: {
      ...lightTheme.palette.themeText,
      gray: '#aaaaaa',
      themeBlack: '#ffffff',
      themeWhite: '#000000'
    },
    bg: {
      100: '#2c2c2c'
    },
    background: {
      default: '#2c2c2c'
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
