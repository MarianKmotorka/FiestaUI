import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Button, Chip, IconButton } from '@material-ui/core'
import { Brightness2, ExpandLess, ExpandMore, WbSunny } from '@material-ui/icons'

import NavLink from '@elements/NavLink'
import useWindowSize from '@hooks/useWindowSize'
import { useAuth } from '@contextProviders/AuthProvider'
import NavbarMenu from './NavbarMenu/NavbarMenu'
import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'

import {
  Logo,
  Menu,
  LinkText,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup,
  StyledBurger
} from './Navbar.styled'

const Navbar = () => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { theme, isDark, switchTheme } = useAppTheme()
  const { maxMedium } = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileChipEl, setProfileChipEl] = useState<HTMLElement>()
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

  const toggleMenu = (value?: boolean) => {
    setProfileChipEl(undefined)
    setMenuOpen(prev => value || !prev)
  }

  const pushAndClose = (path: string) => () => {
    toggleMenu(false)
    router.push(path)
  }

  return (
    <StyledAppBar elevation={0}>
      <StyledContainer>
        <Logo onClick={() => router.push('/')} />

        <AnimatePresence>
          {showMenu && (
            <Menu {...menuAnimations}>
              {auth.isLoggedIn && (
                <>
                  <NavLink href='/home'>
                    <LinkText>Home</LinkText>
                  </NavLink>

                  <NavLink href='/places'>
                    <LinkText>Places</LinkText>
                  </NavLink>

                  <NavLink href='/people'>
                    <LinkText>People</LinkText>
                  </NavLink>

                  <Chip
                    avatar={<Avatar src={auth.currentUser.pictureUrl} />}
                    label={auth.currentUser.fullName}
                    onDelete={() => {}}
                    clickable
                    color='primary'
                    deleteIcon={profileChipEl ? <ExpandLess /> : <ExpandMore />}
                    onClick={e => setProfileChipEl(prev => (prev ? undefined : e.currentTarget))}
                  />

                  {profileChipEl && (
                    <NavbarMenu
                      onClose={() => setProfileChipEl(undefined)}
                      anchorEl={profileChipEl}
                    />
                  )}
                </>
              )}

              {!auth.isLoggedIn && (
                <>
                  <IconButton onClick={switchTheme}>
                    {isDark ? <WbSunny color='primary' /> : <Brightness2 />}
                  </IconButton>

                  <StyledButtonGroup size={maxMedium ? 'large' : 'medium'}>
                    <Button color='secondary' variant='contained' onClick={pushAndClose('/login')}>
                      {t('login')}
                    </Button>

                    <Button color='primary' variant='contained' onClick={pushAndClose('/signup')}>
                      {t('signup')}
                    </Button>
                  </StyledButtonGroup>
                </>
              )}
            </Menu>
          )}
        </AnimatePresence>

        {maxMedium && (
          <IconButton onClick={() => toggleMenu()}>
            <StyledBurger
              isOpen={menuOpen}
              width={28}
              height={17}
              strokeWidth={3}
              borderRadius={3}
              menuClicked={() => {}}
              animationDuration={0.15}
              color={theme.palette.primary.main}
            />
          </IconButton>
        )}
      </StyledContainer>
    </StyledAppBar>
  )
}

export default Navbar
