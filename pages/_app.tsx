import moment from 'moment'
import { AppProps } from 'next/app'
import MomentUtils from '@date-io/moment'
import { ToastContainer } from 'react-toastify'
import useTranslation from 'next-translate/useTranslation'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import AuthProvider from '@contextProviders/AuthProvider'
import AppThemeProvider from '@contextProviders/AppThemeProvider/AppThemeProvider'

import '../public/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } }
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { lang } = useTranslation()
  moment.locale(lang)

  // Note: Keep AppThemeProvider close to the Component
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppThemeProvider>
            <Component {...pageProps} />

            <ToastContainer />
          </AppThemeProvider>
        </MuiPickersUtilsProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
