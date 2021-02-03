import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import { yellow } from '@material-ui/core/colors'
import red from '@material-ui/core/colors/red'

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: '#19857b'
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
      default: '#fff'
      //   paper: '3c3c3c'
    },
    bg: {
      100: '#f1f1f1'
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
