import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  CssBaseline,
  StylesProvider,
  Theme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core'
import { lightTheme, darkTheme } from 'utils/theme'
import useLocalStorage from '@hooks/useLocalStorage'

const Hidden = styled.div`
  visibility: hidden;
`
interface IAppThemeContextValue {
  switchTheme: () => void
  theme: Theme
}

const AppThemeContext = createContext<IAppThemeContextValue>(null!)
export const useAppTheme = () => useContext(AppThemeContext)

const AppThemeProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = useLocalStorage<'dark' | 'light'>('chatsample.theme', 'light')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles)
  }, [])

  useEffect(() => setIsMounted(true), [])

  const switchTheme = useCallback(() => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [themeType])

  const theme = themeType === 'light' ? lightTheme : darkTheme
  const value: IAppThemeContextValue = { theme, switchTheme }

  const body = (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme.palette}>
          <AppThemeContext.Provider value={value}>
            <CssBaseline />

            {children}
          </AppThemeContext.Provider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )

  return isMounted ? body : <Hidden>{body}</Hidden> // This can cause problems
}

export default AppThemeProvider
