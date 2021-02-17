import { useAppTheme } from '@contextProviders/AppThemeProvider'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { Brightness2, ExitToApp, Settings, WbSunny } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {
  MenuContent,
  Name,
  StyledAvatar,
  StyledDivider,
  StyledMenu,
  StyledMenuItem
} from './ProfileMenu.styled'

interface IProfileDropdownProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const ProfileDropdown = ({ anchorEl, onClose }: IProfileDropdownProps) => {
  const { currentUser, logout } = useAuthorizedUser()
  const { isDark, switchTheme } = useAppTheme()
  const { t } = useTranslation('common')

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
        <Link href='/profile'>
          <StyledAvatar src={currentUser.pictureUrl} />
        </Link>

        <Link href='/profile'>
          <Name>{currentUser.fullName}</Name>
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

export default ProfileDropdown
