import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components'
import {
  CssBaseline,
  StylesProvider,
  Theme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core'

import useLocalStorage from '@hooks/useLocalStorage'
import Hidden from '@elements/Hidden'
import { lightTheme, darkTheme } from 'utils/theme'

const GlobalStyles = createGlobalStyle`
.MuiMenuItem-root{
  color:${({ theme }) => theme.themeText.themeBlack};
}
`

interface IAppThemeContextValue {
  switchTheme: () => void
  theme: Theme
  isDark: boolean
}

const AppThemeContext = createContext<IAppThemeContextValue>(null!)
export const useAppTheme = () => useContext(AppThemeContext)

const AppThemeProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = useLocalStorage<'dark' | 'light'>('FIESTA.theme', 'light')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles)
  }, [])

  useEffect(() => setIsMounted(true), [])

  const switchTheme = useCallback(() => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeType]) // TODO: check this problem

  const theme = themeType === 'light' ? lightTheme : darkTheme
  const value: IAppThemeContextValue = { theme, switchTheme, isDark: themeType === 'dark' }

  const body = (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme.palette}>
          <AppThemeContext.Provider value={value}>
            <CssBaseline />
            <GlobalStyles />

            {children}
          </AppThemeContext.Provider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )

  return isMounted ? body : <Hidden hidden>{body}</Hidden> // This can cause problems
}

export default AppThemeProvider
