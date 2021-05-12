import useTranslation from 'next-translate/useTranslation'
import { BottomNavigation as MuiNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  AccountCircleTwoTone,
  DashboardTwoTone,
  ExploreTwoTone,
  SettingsTwoTone
} from '@material-ui/icons'

import NavLink from '@elements/NavLink'
import useWindowSize from '@hooks/useWindowSize'
import { useAuth } from '@contextProviders/AuthProvider'

import { Wrapper } from './BottomNavigation.styled'

const SELECTED = 'Mui-selected'

const BottomNavigation = () => {
  const { t } = useTranslation('common')
  const auth = useAuth()
  const { maxMedium } = useWindowSize()

  if (!maxMedium || !auth.isLoggedIn) return <></>

  return (
    <Wrapper>
      <MuiNavigation>
        <NavLink href='/events' activeClassName={SELECTED}>
          <BottomNavigationAction label={t('events')} icon={<DashboardTwoTone />} showLabel />
        </NavLink>

        <NavLink href='/explore' activeClassName={SELECTED}>
          <BottomNavigationAction label={t('explore')} icon={<ExploreTwoTone />} showLabel />
        </NavLink>

        <NavLink href={`/users/${auth.currentUser.id}`} activeClassName={SELECTED}>
          <BottomNavigationAction label={t('profile')} icon={<AccountCircleTwoTone />} showLabel />
        </NavLink>

        <NavLink href='/settings' activeClassName={SELECTED}>
          <BottomNavigationAction label={t('settings')} icon={<SettingsTwoTone />} showLabel />
        </NavLink>
      </MuiNavigation>
    </Wrapper>
  )
}

export default BottomNavigation
