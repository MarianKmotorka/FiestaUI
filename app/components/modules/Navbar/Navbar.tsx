import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Badge, Button, Tooltip } from '@material-ui/core'
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
import NavbarMenu from './NavbarMenu/NavbarMenu'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import { useAuth } from '@contextProviders/AuthProvider'
import Notifications from '@modules/Notifications/Notifications'
import { useNotifications } from '@modules/Notifications/NotificationsProvider'

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
  transparent?: true
}

const Navbar = ({ forceUnauthorizedNavbar, transparent }: INavbarProps) => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const [searchOpen, setSearchOpen] = useState(false)
  const [avatarEl, setAvatarEl] = useState<HTMLElement>()
  const [notificationsEl, setNotificationsEl] = useState<HTMLElement>()
  const { unseenCount } = useNotifications()

  const notificationButton = (
    <NavIconButton
      onClick={e => setNotificationsEl(notificationsEl ? undefined : e.currentTarget)}
      active={notificationsEl ? 1 : 0}
    >
      <Badge badgeContent={unseenCount} color='primary'>
        <NotificationsTwoTone />
      </Badge>
    </NavIconButton>
  )

  const mobileContent = (
    <>
      <NavIconButton onClick={() => setSearchOpen(true)}>
        <SearchTwoTone />
      </NavIconButton>

      <NavIconButton>
        <ChatTwoTone />
      </NavIconButton>

      <NavIconButton>
        <PeopleTwoTone />
      </NavIconButton>

      {notificationButton}
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

      <Tooltip title={t('notifications')}>{notificationButton}</Tooltip>

      <Avatar
        src={auth.currentUser.pictureUrl}
        onClick={e => setAvatarEl(avatarEl ? undefined : e.currentTarget)}
      />

      {avatarEl && <NavbarMenu onClose={() => setAvatarEl(undefined)} anchorEl={avatarEl} />}
    </>
  )

  return (
    <StyledAppBar elevation={0} transparent={transparent ? 1 : 0}>
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

      {notificationsEl && (
        <Notifications anchorEl={notificationsEl} onClose={() => setNotificationsEl(undefined)} />
      )}
    </StyledAppBar>
  )
}

export default Navbar
