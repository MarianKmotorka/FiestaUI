import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import red from '@material-ui/core/colors/red'
import { grey } from '@material-ui/core/colors'

export const SM = 400
export const MD = 700
export const LG = 900
export const XL = 1024
export const XXL = 1320

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
      main: red.A700
    },
    themeText: {
      black: '#000000',
      white: '#ffffff',
      themeGray: '#444444',
      themeBlack: '#000000',
      themeWhite: '#ffffff'
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400
    }
  },
  breakpoints: {
    values: { sm: MD, lg: XL, md: LG, xl: XXL, xs: SM }
  },
  overrides: {
    MuiBackdrop: { root: { backgroundColor: 'rgba(0,0,0,0.8)' } }
  }
})

export const darkTheme = createMuiTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    type: 'dark',
    secondary: {
      main: grey[400]
    },
    themeText: {
      ...lightTheme.palette.themeText,
      themeGray: '#aaaaaa',
      themeBlack: '#ffffff',
      themeWhite: '#000000'
    },
    background: {
      default: '#171717',
      paper: '#252525'
    }
  }
})

declare module 'styled-components' {
  export interface DefaultTheme extends Palette {}
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    themeText: {
      black: string
      white: string
      themeGray: string
      themeBlack: string
      themeWhite: string
    }
  }

  interface PaletteOptions {
    themeText: {
      black: string
      white: string
      themeGray: string
      themeBlack: string
      themeWhite: string
    }
  }
}
