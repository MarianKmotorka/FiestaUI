import '../public/globals.css'
import { AppProps } from 'next/app'
import MomentUtils from '@date-io/moment'
import AuthProvider from '@contextProviders/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import AppThemeProvider from '@contextProviders/AppThemeProvider'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Note: Keep AppThemeProvider close to the Component
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppThemeProvider>
            <Component {...pageProps} />
          </AppThemeProvider>
        </MuiPickersUtilsProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
