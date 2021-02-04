import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '@contextProviders/AuthProvider'
import { loginUsingGoogleCode } from 'services/authService'

const GoogleLoginCallback = () => {
  const [error, setError] = useState<string>()
  const { query, replace } = useRouter()
  const { fetchUser } = useAuth()

  useEffect(() => {
    const sendCodeToServer = async () => {
      const successOrError = await loginUsingGoogleCode(query.code as string)
      if (successOrError !== true) return setError(successOrError)

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

      {error && <h2>{error}</h2>}
    </>
  )
}

export default GoogleLoginCallback
