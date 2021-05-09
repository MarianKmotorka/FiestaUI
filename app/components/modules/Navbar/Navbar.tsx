import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, Button, IconButton, Tooltip } from '@material-ui/core'
import {
  AccountCircleTwoTone,
  Add,
  Brightness2TwoTone,
  EventTwoTone,
  ExitToAppTwoTone,
  ExploreTwoTone,
  FingerprintTwoTone,
  HomeTwoTone,
  NotificationsTwoTone,
  SearchTwoTone,
  SettingsTwoTone,
  WbSunnyTwoTone
} from '@material-ui/icons'

import NavLink from '@elements/NavLink'
import Divider from '@elements/Divider'
import useWindowSize from '@hooks/useWindowSize'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import { useAuth } from '@contextProviders/AuthProvider'
import NavbarMenu from './NavbarMenu/NavbarMenu'
import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'

import {
  Logo,
  Menu,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup,
  StyledBurger,
  MobileMenuItem,
  NavIconButton
} from './Navbar.styled'

interface INavbarProps {
  forceUnauthorizedNavbar?: true
}

const Navbar = ({ forceUnauthorizedNavbar }: INavbarProps) => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { theme, isDark, switchTheme } = useAppTheme()
  const { maxMedium } = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
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

  const switchThemeMenuItem = (
    <MobileMenuItem onClick={switchTheme}>
      {isDark ? <WbSunnyTwoTone color='primary' /> : <Brightness2TwoTone />}
      {t('switchTheme')}
    </MobileMenuItem>
  )

  const mobileContent =
    auth.isLoggedIn && !forceUnauthorizedNavbar ? (
      <>
        <NavLink href='/home'>
          <MobileMenuItem>
            <HomeTwoTone />
            {t('home')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/events'>
          <MobileMenuItem>
            <EventTwoTone />
            {t('events')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/explore'>
          <MobileMenuItem>
            <ExploreTwoTone />
            {t('explore')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href={`/users/${auth.currentUser.id}`}>
          <MobileMenuItem>
            <AccountCircleTwoTone />
            {t('profile')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/settings'>
          <MobileMenuItem>
            <SettingsTwoTone />
            {t('settings')}
          </MobileMenuItem>
        </NavLink>

        <Box width='90%' margin='5px auto'>
          <Divider />
        </Box>

        {switchThemeMenuItem}

        <MobileMenuItem onClick={() => auth.logout()}>
          <ExitToAppTwoTone />
          {t('logout')}
        </MobileMenuItem>
      </>
    ) : (
      <>
        <NavLink href='/login'>
          <MobileMenuItem>
            <FingerprintTwoTone />
            {t('login')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/signup'>
          <MobileMenuItem>
            <Add />
            {t('signup')}
          </MobileMenuItem>
        </NavLink>

        <Box width='90%' margin='5px auto'>
          <Divider />
        </Box>

        {switchThemeMenuItem}
      </>
    )

  const desktopContent =
    auth.isLoggedIn && !forceUnauthorizedNavbar ? (
      <>
        <NavLink href='/home'>
          <Tooltip title={t('home')}>
            <NavIconButton>
              <HomeTwoTone />
            </NavIconButton>
          </Tooltip>
        </NavLink>

        <NavLink href='/events'>
          <Tooltip title={t('events')}>
            <NavIconButton>
              <EventTwoTone />
            </NavIconButton>
          </Tooltip>
        </NavLink>

        <NavLink href='/explore'>
          <Tooltip title={t('explore')}>
            <NavIconButton>
              <ExploreTwoTone />
            </NavIconButton>
          </Tooltip>
        </NavLink>

        <Box alignSelf='stretch' paddingY='5px'>
          <Divider orientation='vertical' />
        </Box>

        <Tooltip title={t('search')}>
          <NavIconButton onClick={() => setSearchOpen(true)}>
            <SearchTwoTone />
          </NavIconButton>
        </Tooltip>

        <Tooltip title={t('notifications')}>
          <NavIconButton>
            <NotificationsTwoTone />
          </NavIconButton>
        </Tooltip>

        <Avatar
          src={auth.currentUser.pictureUrl}
          onClick={e => setProfileChipEl(profileChipEl ? undefined : e.currentTarget)}
        />

        {profileChipEl && (
          <NavbarMenu onClose={() => setProfileChipEl(undefined)} anchorEl={profileChipEl} />
        )}
      </>
    ) : (
      <>
        <IconButton onClick={switchTheme}>
          {isDark ? <WbSunnyTwoTone color='primary' /> : <Brightness2TwoTone />}
        </IconButton>

        <StyledButtonGroup>
          <Button
            color='secondary'
            variant='text'
            size='large'
            onClick={() => router.push('/login')}
          >
            {t('login').toUpperCase()}
          </Button>

          <Button
            color='primary'
            variant='contained'
            size='large'
            onClick={() => router.push('/signup')}
          >
            {t('signup').toUpperCase()}
          </Button>
        </StyledButtonGroup>
      </>
    )

  return (
    <StyledAppBar elevation={0}>
      <StyledContainer>
        <Logo onClick={() => router.push(auth.isLoggedIn ? '/home' : '/')} />

        <AnimatePresence>
          {showMenu && (
            <Menu {...menuAnimations}>{maxMedium ? mobileContent : desktopContent}</Menu>
          )}
        </AnimatePresence>

        {maxMedium && (
          <>
            {auth.isLoggedIn && !forceUnauthorizedNavbar && (
              <>
                <NavIconButton onClick={() => setSearchOpen(true)}>
                  <SearchTwoTone />
                </NavIconButton>

                <NavIconButton>
                  <NotificationsTwoTone />
                </NavIconButton>
              </>
            )}

            <IconButton onClick={() => toggleMenu()}>
              <StyledBurger
                isOpen={menuOpen}
                width={25}
                height={16}
                strokeWidth={1}
                borderRadius={100}
                menuClicked={() => {}}
                animationDuration={0.15}
                color={theme.palette.primary.main}
              />
            </IconButton>
          </>
        )}
      </StyledContainer>

      {searchOpen && <NavbarSearch onClose={() => setSearchOpen(false)} />}
    </StyledAppBar>
  )
}

export default Navbar
