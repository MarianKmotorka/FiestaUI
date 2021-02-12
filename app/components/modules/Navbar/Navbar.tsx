import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import { Menu as MenuIcon, Close as CloseIcon, WbSunny, NightsStay } from '@material-ui/icons'
import { Avatar, Button, Chip, IconButton } from '@material-ui/core'

import useWindowSize from '@hooks/useWindowSize'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '@contextProviders/AuthProvider'

import {
  Logo,
  Menu,
  NavLink,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup
} from './Navbar.styled'
import { useAppTheme } from '@contextProviders/AppThemeProvider'

const Navbar = () => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { switchTheme, isDark } = useAppTheme()
  const { maxMedium, minMedium, maxLarge } = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(false)
  const showMenu = !maxMedium || (maxMedium && menuOpen)
  const menuAnimations = maxMedium
    ? {
        initial: { clipPath: 'circle(30%)', opacity: 0.1 },
        animate: { clipPath: 'circle(100%)', opacity: 1 },
        exit: { clipPath: 'circle(30%)', opacity: 0.1 },
        transition: {
          type: { damping: 0 }
        }
      }
    : {}

  const pushAndClose = (path: string) => () => {
    setMenuOpen(false)
    router.push(path)
  }

  return (
    <StyledAppBar elevation={0}>
      <StyledContainer>
        <Logo onClick={() => router.push('/')} />

        <AnimatePresence>
          {showMenu && (
            <Menu {...menuAnimations}>
              {!auth.isLoggedIn && (
                <StyledButtonGroup size={maxMedium ? 'large' : 'medium'}>
                  <Button color='secondary' variant='contained' onClick={pushAndClose('/login')}>
                    {t('login')}
                  </Button>

                  <Button color='primary' variant='contained' onClick={pushAndClose('/signup')}>
                    {t('signup')}
                  </Button>
                </StyledButtonGroup>
              )}

              {auth.isLoggedIn && (
                <>
                  <Link href='/home'>
                    <NavLink>Home</NavLink>
                  </Link>

                  <Link href='/places'>
                    <NavLink>Places</NavLink>
                  </Link>

                  <Link href='/people'>
                    <NavLink>People</NavLink>
                  </Link>
                </>
              )}

              <IconButton onClick={switchTheme}>
                {isDark ? <WbSunny color='primary' /> : <NightsStay />}
              </IconButton>

              {auth.isLoggedIn && (
                <Chip
                  avatar={<Avatar src={auth.currentUser.pictureUrl} />}
                  label={minMedium && maxLarge ? '' : auth.currentUser.fullName}
                  clickable
                  onDelete={auth.logout}
                  color='primary'
                />
              )}
            </Menu>
          )}
        </AnimatePresence>

        {maxMedium && (
          <IconButton color='primary' onClick={() => setMenuOpen(prev => !prev)}>
            {menuOpen ? (
              <CloseIcon style={{ fontSize: '2rem' }} />
            ) : (
              <MenuIcon style={{ fontSize: '2rem' }} />
            )}
          </IconButton>
        )}
      </StyledContainer>
    </StyledAppBar>
  )
}

export default Navbar
