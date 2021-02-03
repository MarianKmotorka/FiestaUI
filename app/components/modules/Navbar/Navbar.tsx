import { useAppTheme } from '@contextProviders/AppThemeProvider'
import { useAuth } from '@contextProviders/AuthProvider'
import { Button, ButtonGroup, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styled from 'styled-components'
import { getGoogleLoginUrl } from '../../../services/authService'
import { locales } from '../../../../i18n.json'
import cookie from 'js-cookie'

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  padding: 10px 50px;
  background-color: ${({ theme }) => theme.bg[100]};
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 15px;
  }
`

const StyledButton = styled(Button)<{ radius?: string }>`
  border-radius: ${({ radius }) => radius || '10px'};
`

const StyledLink = styled.a`
  color: ${({ theme }) => theme.themeText.themeBlack};
`

const Logo = styled.h1`
  color: ${({ theme }) => theme.themeText.themeBlack};
`

const Navbar = () => {
  const auth = useAuth()
  const { query, push, asPath } = useRouter()
  const { lang } = useTranslation()
  const { switchTheme } = useAppTheme()

  const handleGoogleLogin = () => {
    const url = getGoogleLoginUrl(query.redirectedFrom as string)
    window.location.assign(url)
  }

  return (
    <Wrapper>
      <StyledButton
        radius='0px'
        color='primary'
        variant='contained'
        disableElevation
        onClick={switchTheme}
      >
        Theme
      </StyledButton>

      {!auth.isLoggedIn && (
        <Button
          variant='contained'
          color='secondary'
          onClick={handleGoogleLogin}
          disabled={auth.isLoading}
        >
          {auth.isLoading ? '...' : 'Google login'}
        </Button>
      )}

      {auth.isLoggedIn && (
        <>
          <Button variant='contained' color='secondary' onClick={auth.logout}>
            Logout
          </Button>
        </>
      )}

      <ButtonGroup>
        {locales.map(locale => {
          if (locale === lang)
            return (
              <Button key={locale} color='secondary' variant='contained'>
                {lang}
              </Button>
            )

          return (
            <Button
              color='secondary'
              variant='outlined'
              key={locale}
              onClick={() => {
                cookie.set('NEXT_LOCALE', locale)
                push(asPath, undefined, { locale })
              }}
            >
              {locale}
            </Button>
          )
        })}
      </ButtonGroup>

      <Link href='/' passHref>
        <StyledLink>Home</StyledLink>
      </Link>

      <Logo>DEMO App</Logo>
    </Wrapper>
  )
}

export default Navbar
