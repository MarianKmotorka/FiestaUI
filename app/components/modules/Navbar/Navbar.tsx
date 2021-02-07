import { Avatar, Button, ButtonGroup, Chip } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'

import { useAppTheme } from '@contextProviders/AppThemeProvider'
import { useAuth } from '@contextProviders/AuthProvider'
import { Logo, StyledAppBar, StyledContainer } from './Navbar.styled'

const Navbar = () => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { switchTheme } = useAppTheme()

  return (
    <StyledAppBar>
      <StyledContainer>
        <Logo onClick={() => router.push('/')}>Fiesta</Logo>

        {!auth.isLoggedIn && (
          <ButtonGroup>
            <Button color='secondary' variant='outlined' onClick={() => router.push('/login')}>
              {t('login')}
            </Button>

            <Button color='primary' variant='contained' onClick={() => router.push('/signup')}>
              {t('signup')}
            </Button>
          </ButtonGroup>
        )}

        {auth.isLoggedIn && (
          <>
            <Chip
              avatar={<Avatar src={auth.currentUser.pictureUrl} />}
              label={auth.currentUser.fullName}
              clickable
              color='primary'
            />
          </>
        )}
      </StyledContainer>
    </StyledAppBar>
  )
}

export default Navbar
