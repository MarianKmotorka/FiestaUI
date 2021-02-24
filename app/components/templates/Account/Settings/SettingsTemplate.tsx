import { useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags } from 'domainTypes'
import useWindowSize from '@hooks/useWindowSize'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import SignInMethodsTab from './Tabs/SignInMethodsTab/SignInMethodsTab'
import ChangePasswordTab from './Tabs/ChangePasswordTab/ChangePasswordTab'
import DeleteAccountTab from './Tabs/DeleteAccountTab/DeleteAccountTab'
import { AccountCircle, DeleteForever, LockOpen, VpnKey } from '@material-ui/icons'

import {
  TabPanelContainer,
  TabsContainer,
  StyledTab,
  StyledPanel,
  Wrapper
} from './SettingsTemplate.styled'

const SettingsTemplate = () => {
  const router = useRouter()
  const [currTab, setCurrTab] = useState((router.query.tab as string) || 'editProfile')
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const { currentUser } = useAuthorizedUser()

  const changeTab = (value: string) => {
    setCurrTab(value)
    router.push({ pathname: router.pathname, query: { tab: value } }, undefined, { shallow: true })
  }

  return (
    <Wrapper>
      <TabsContainer>
        <Tabs
          value={currTab}
          textColor='inherit'
          indicatorColor='primary'
          onChange={(_, value) => changeTab(value)}
          orientation={maxMedium ? 'horizontal' : 'vertical'}
        >
          <StyledTab
            value='editProfile'
            label={!maxMedium && t('editProfile')}
            icon={maxMedium ? <AccountCircle /> : undefined}
          />

          {hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword) && (
            <StyledTab
              value='changePassword'
              label={!maxMedium && t('changePassword')}
              icon={maxMedium ? <VpnKey /> : undefined}
            />
          )}

          <StyledTab
            value='signInMethods'
            label={!maxMedium && t('signInMethods')}
            icon={maxMedium ? <LockOpen /> : undefined}
          />

          <StyledTab
            value='deleteAccount'
            label={!maxMedium && t('deleteAccount')}
            icon={maxMedium ? <DeleteForever /> : undefined}
          />
        </Tabs>
      </TabsContainer>

      <TabPanelContainer>
        <StyledPanel index='editProfile' value={currTab}>
          Tab number: {currTab + 1}
        </StyledPanel>

        <StyledPanel index='changePassword' value={currTab}>
          <ChangePasswordTab />
        </StyledPanel>

        <StyledPanel index='signInMethods' value={currTab}>
          <SignInMethodsTab />
        </StyledPanel>

        <StyledPanel index='deleteAccount' value={currTab}>
          <DeleteAccountTab />
        </StyledPanel>
      </TabPanelContainer>
    </Wrapper>
  )
}

export default SettingsTemplate
