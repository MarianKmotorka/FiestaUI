import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { Card, CardContent } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import Head from 'next/head'

import { loginUsingGoogleCode } from 'services/authService'
import { useAuth } from '@contextProviders/AuthProvider'
import { getReturnUrlFromQuery } from 'utils/utils'
import FiestaLogo from '@elements/FiestaLogo'
import Button from '@elements/Button/Button'

const Overlay = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;

  .MuiCardContent-root {
    padding: 30px;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.error.main};
  }
`

const GoogleLoginCallback = () => {
  const [error, setError] = useState<string>()
  const { query, replace } = useRouter()
  const { t } = useTranslation('common')
  const { fetchUser } = useAuth()

  useEffect(() => {
    const sendCodeToServer = async () => {
      const successOrError = await loginUsingGoogleCode(query.code as string)
      if (successOrError !== true) return setError(successOrError)

      await fetchUser()
      replace(getReturnUrlFromQuery(query) || '/home')
    }

    query.code && sendCodeToServer()
  }, [query])

  return (
    <Overlay>
      <Head>
        <title>Callback</title>
      </Head>

      {!error && <FiestaLogo />}

      {error && (
        <Card>
          <CardContent>
            <p>{t(`validator.${error}`)}</p>

            <Button
              startIcon={<KeyboardArrowLeft />}
              variant='outlined'
              onClick={() => replace('/login')}
            >
              {t('back')}
            </Button>
          </CardContent>
        </Card>
      )}
    </Overlay>
  )
}

export default GoogleLoginCallback
