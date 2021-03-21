import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Brightness2, ExitToApp, Settings, WbSunny } from '@material-ui/icons'

import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import {
  MenuContent,
  Name,
  StyledAvatar,
  StyledDivider,
  StyledMenu,
  StyledMenuItem
} from './NavbarMenu.styled'

interface INavbarMenuProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const NavbarMenu = ({ anchorEl, onClose }: INavbarMenuProps) => {
  const { currentUser, logout } = useAuthorizedUser()
  const { isDark, switchTheme } = useAppTheme()
  const { t } = useTranslation('common')

  const userDetailLink = `/users/${currentUser.id}`

  return (
    <StyledMenu
      elevation={4}
      open
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <MenuContent>
        <Link href={userDetailLink}>
          <StyledAvatar src={currentUser.pictureUrl} />
        </Link>

        <Link href={userDetailLink}>
          <Name>{currentUser.username}</Name>
        </Link>

        <StyledDivider />

        <StyledMenuItem onClick={switchTheme}>
          {t('switchTheme')}
          {isDark ? <WbSunny id='lightThemeIcon' /> : <Brightness2 />}
        </StyledMenuItem>

        <Link href='/settings'>
          <StyledMenuItem>
            {t('settings')}
            <Settings />
          </StyledMenuItem>
        </Link>

        <StyledMenuItem onClick={logout}>
          {t('logout')}
          <ExitToApp />
        </StyledMenuItem>
      </MenuContent>
    </StyledMenu>
  )
}

export default NavbarMenu
