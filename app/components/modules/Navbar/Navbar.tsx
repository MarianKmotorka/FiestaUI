import { useAppTheme } from '@contextProviders/AppThemeProvider'
import { useAuth } from '@contextProviders/AuthProvider'
import { AppBar, Button, ButtonGroup, makeStyles, Toolbar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styled from 'styled-components'
import { getGoogleLoginUrl } from '../../../services/authService'
import { locales } from '../../../../i18n.json'
import cookie from 'js-cookie'
import { Logo, StyledAppBar, StyledContainer } from './Navbar.styled'

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
    <StyledAppBar>
      <StyledContainer>
        <Logo>Fiesta</Logo>

        <ButtonGroup>
          <Button color='secondary' variant='outlined'>
            Kill me
          </Button>

          <Button color='primary' variant='contained'>
            Fuck me
          </Button>
        </ButtonGroup>
      </StyledContainer>
    </StyledAppBar>
  )
}

export default Navbar
