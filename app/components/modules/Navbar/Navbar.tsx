import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, Button, Chip, IconButton } from '@material-ui/core'
import {
  AccountCircle,
  Add,
  Brightness2,
  Event,
  ExitToAppRounded,
  ExpandLess,
  ExpandMore,
  Fingerprint,
  HomeRounded,
  LocationSearching,
  Search,
  Settings,
  WbSunny
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
  LinkText,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup,
  StyledBurger,
  SearchChip,
  MobileMenuItem
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

  const searchChip = (
    <SearchChip avatar={<Search />} onClick={() => setSearchOpen(true)} color='secondary' />
  )

  const switchThemeMenuItem = (
    <MobileMenuItem onClick={switchTheme}>
      {isDark ? <WbSunny color='primary' /> : <Brightness2 />}
      {t('switchTheme')}
    </MobileMenuItem>
  )

  const mobileContent =
    auth.isLoggedIn && !forceUnauthorizedNavbar ? (
      <>
        <NavLink href='/home'>
          <MobileMenuItem>
            <HomeRounded />
            {t('home')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/events'>
          <MobileMenuItem>
            <Event />
            {t('events')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/explore'>
          <MobileMenuItem>
            <LocationSearching />
            {t('explore')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href={`/users/${auth.currentUser.id}`}>
          <MobileMenuItem>
            <AccountCircle />
            {t('profile')}
          </MobileMenuItem>
        </NavLink>

        <NavLink href='/settings'>
          <MobileMenuItem>
            <Settings />
            {t('settings')}
          </MobileMenuItem>
        </NavLink>

        <Box width='90%' margin='5px auto'>
          <Divider />
        </Box>

        {switchThemeMenuItem}

        <MobileMenuItem onClick={auth.logout}>
          <ExitToAppRounded />
          {t('logout')}
        </MobileMenuItem>
      </>
    ) : (
      <>
        <NavLink href='/login'>
          <MobileMenuItem>
            <Fingerprint />
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
          <LinkText>
            <HomeRounded />
            <span>{t('home')}</span>
          </LinkText>
        </NavLink>

        <NavLink href='/events'>
          <LinkText>
            <Event />
            <span>{t('events')}</span>
          </LinkText>
        </NavLink>

        <NavLink href='/explore'>
          <LinkText>
            <LocationSearching />
            <span>{t('explore')}</span>
          </LinkText>
        </NavLink>

        {searchChip}

        <Chip
          avatar={<Avatar src={auth.currentUser.pictureUrl} />}
          label={auth.currentUser.username}
          onDelete={() => {}}
          clickable
          color='primary'
          deleteIcon={profileChipEl ? <ExpandLess /> : <ExpandMore />}
          onClick={e => setProfileChipEl(prev => (prev ? undefined : e.currentTarget))}
        />

        {profileChipEl && (
          <NavbarMenu onClose={() => setProfileChipEl(undefined)} anchorEl={profileChipEl} />
        )}
      </>
    ) : (
      <>
        <IconButton onClick={switchTheme}>
          {isDark ? <WbSunny color='primary' /> : <Brightness2 />}
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
            {auth.isLoggedIn && !forceUnauthorizedNavbar && searchChip}

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
          </>
        )}
      </StyledContainer>

      {searchOpen && <NavbarSearch onClose={() => setSearchOpen(false)} />}
    </StyledAppBar>
  )
}

export default Navbar
