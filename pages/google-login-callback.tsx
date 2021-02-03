import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '@contextProviders/AuthProvider'
import { loginUsingGoogleCode } from 'services/authService'

const GoogleLoginCallback = () => {
  const { query, replace } = useRouter()
  const { fetchUser } = useAuth()

  useEffect(() => {
    const sendCodeToServer = async () => {
      const success = await loginUsingGoogleCode(query.code as string)
      if (!success) replace('/') // ERROR LOGING IN

      await fetchUser()

      try {
        const returnUrl = JSON.parse(query.state as string).returnUrl
        returnUrl && replace(returnUrl)
      } catch (err) {
        replace('/')
      }
    }

    query.code && sendCodeToServer()
  }, [query])

  return (
    <>
      <Head>
        <title>Callback</title>
      </Head>
    </>
  )
}

export default GoogleLoginCallback
