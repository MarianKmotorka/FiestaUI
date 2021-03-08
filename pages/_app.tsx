import '../public/globals.css'
import { AppProps } from 'next/app'
import AppThemeProvider from '@contextProviders/AppThemeProvider'
import AuthProvider from '@contextProviders/AuthProvider'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Note: Keep AppThemeProvider close to the Component
  return (
    <AuthProvider>
      <AppThemeProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </AppThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
