import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Button, IconButton, Tooltip } from '@material-ui/core'
import {
  ChatTwoTone,
  DashboardTwoTone,
  ExploreTwoTone,
  NotificationsTwoTone,
  PeopleTwoTone,
  SearchTwoTone
} from '@material-ui/icons'

import NavLink from '@elements/NavLink'
import useWindowSize from '@hooks/useWindowSize'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import { useAuth } from '@contextProviders/AuthProvider'
import NavbarMenu from './NavbarMenu/NavbarMenu'

import {
  Logo,
  Menu,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup,
  NavIconButton
} from './Navbar.styled'

interface INavbarProps {
  forceUnauthorizedNavbar?: true
}

const Navbar = ({ forceUnauthorizedNavbar }: INavbarProps) => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileChipEl, setProfileChipEl] = useState<HTMLElement>()

  const mobileContent = (
    <>
      <IconButton onClick={() => setSearchOpen(true)}>
        <SearchTwoTone />
      </IconButton>

      <IconButton>
        <ChatTwoTone />
      </IconButton>

      <IconButton>
        <PeopleTwoTone />
      </IconButton>

      <IconButton>
        <NotificationsTwoTone />
      </IconButton>
    </>
  )

  const desktopContent = auth.isLoggedIn && (
    <>
      <NavLink href='/events'>
        <Tooltip title={t('events')}>
          <NavIconButton>
            <DashboardTwoTone />
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

      <Tooltip title={t('messages')}>
        <NavIconButton>
          <ChatTwoTone />
        </NavIconButton>
      </Tooltip>

      <Tooltip title={t('friendRequests')}>
        <NavIconButton>
          <PeopleTwoTone />
        </NavIconButton>
      </Tooltip>

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
  )

  return (
    <StyledAppBar elevation={0}>
      <StyledContainer>
        <Logo onClick={() => router.push(auth.isLoggedIn ? '/events' : '/')} />

        <Menu>
          {auth.isLoggedIn && !forceUnauthorizedNavbar ? (
            maxMedium ? (
              mobileContent
            ) : (
              desktopContent
            )
          ) : (
            <StyledButtonGroup>
              <Button
                color='secondary'
                variant='text'
                size={maxMedium ? 'small' : 'large'}
                onClick={() => router.push('/login')}
              >
                {t('login').toUpperCase()}
              </Button>

              <Button
                color='primary'
                variant='contained'
                size={maxMedium ? 'small' : 'large'}
                onClick={() => router.push('/signup')}
              >
                {t('signup').toUpperCase()}
              </Button>
            </StyledButtonGroup>
          )}
        </Menu>
      </StyledContainer>

      {searchOpen && <NavbarSearch onClose={() => setSearchOpen(false)} />}
    </StyledAppBar>
  )
}

export default Navbar
