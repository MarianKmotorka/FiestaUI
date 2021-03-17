import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { IApiError } from 'types'
import api from '@api/HttpClient'
import Button from '@elements/Button/Button'
import Snackbar from '@elements/Snackbar/Snackbar'
import { useAuth } from '@contextProviders/AuthProvider'

const getGoogleRedirectUrl = () => {
  const redirectUri = `${window.location.origin + '/settings?tab=signInMethods'}`

  const queryParams = [
    `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    `redirect_uri=${redirectUri}`,
    'response_type=code',
    'scope=openid profile email',
    'access_type=offline'
  ]
    .filter(x => !!x)
    .join('&')

  return 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams
}

const ConnectGoogleAccount = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { fetchUser } = useAuth()
  const [error, setError] = useState<string>()
  const [connecting, setConnecting] = useState(!!query.code)

  useEffect(() => {
    const connect = async () => {
      try {
        await api.post('/auth/connect-google-account', { code: query.code })
        await fetchUser()
      } catch (err) {
        const message = (err as IApiError).data.errorMessage
        setError(message)
        setConnecting(false)
      }
    }

    query.code && connect()
  }, [query.code, fetchUser])

  return (
    <>
      <Button
        variant='outlined'
        loading={connecting}
        onClick={() => window.location.assign(getGoogleRedirectUrl())}
      >
        {t('connectGoogleAccount')}
      </Button>

      {error && (
        <Snackbar
          severity='error'
          onClose={() => setError(undefined)}
          translationKey={`validator.${error}`}
        />
      )}
    </>
  )
}

export default ConnectGoogleAccount
