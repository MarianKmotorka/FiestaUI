import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { IApiError } from 'types'
import api from '@api/HttpClient'
import Button from '@elements/Button/Button'
import Snackbar from '@elements/Snackbar/Snackbar'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

const getGoogleRedirectUrl = () => {
  const redirectUri = `${window.location.origin + '/settings?tab=deleteAccount'}`

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

const DeleteAccountWithGoogle = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { logout } = useAuthorizedUser()
  const [error, setError] = useState<string>()
  const [deleting, setdeleting] = useState(!!query.code)

  useEffect(() => {
    const deleteAccount = async () => {
      try {
        await api.delete(`/auth/delete-account-with-code?code=${query.code}`)
        await logout()
      } catch (err) {
        const message = (err as IApiError).response.data.errorMessage
        setError(message)
        setdeleting(false)
      }
    }

    query.code && deleteAccount()
  }, [query.code])

  return (
    <>
      <Button
        variant='outlined'
        loading={deleting}
        onClick={() => window.location.assign(getGoogleRedirectUrl())}
      >
        {t('deleteWithGoogle')}
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

export default DeleteAccountWithGoogle
