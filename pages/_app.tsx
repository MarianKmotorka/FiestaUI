import '../public/globals.css'
import { AppProps } from 'next/app'
import AppThemeProvider from '@contextProviders/AppThemeProvider'
import AuthProvider from '@contextProviders/AuthProvider'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Note: Keep AppThemeProvider close to the Component
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
