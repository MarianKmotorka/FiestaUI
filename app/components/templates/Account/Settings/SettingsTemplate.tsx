import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { hasFlag } from 'utils/utils'
import { Tabs } from '@material-ui/core'
import { AuthProviderFlags } from 'domainTypes'
import useWindowSize from '@hooks/useWindowSize'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import ChangePasswordTab from './Tabs/ChangePasswordTab/ChangePasswordTab'
import { AccountCircle, DeleteForever, Language, VpnKey } from '@material-ui/icons'

import {
  TabPanelContainer,
  TabsContainer,
  StyledTab,
  StyledPanel,
  Wrapper
} from './SettingsTemplate.styled'

const SettingsTemplate = () => {
  const [currTab, setCurrTab] = useState('editProfile')
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const { currentUser } = useAuthorizedUser()

  return (
    <Wrapper>
      <TabsContainer>
        <Tabs
          value={currTab}
          textColor='inherit'
          indicatorColor='primary'
          onChange={(_, value) => setCurrTab(value)}
          orientation={maxMedium ? 'horizontal' : 'vertical'}
        >
          <StyledTab
            value='editProfile'
            label={!maxMedium && t('editProfile')}
            icon={maxMedium ? <AccountCircle /> : undefined}
          />

          {hasFlag(currentUser.authProvider, AuthProviderFlags.EmailAndPassword) && (
            <StyledTab
              value='changePassword'
              label={!maxMedium && t('changePassword')}
              icon={maxMedium ? <VpnKey /> : undefined}
            />
          )}

          <StyledTab
            value='language'
            label={!maxMedium && t('language')}
            icon={maxMedium ? <Language /> : undefined}
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

        <StyledPanel index='language' value={currTab}>
          lang
        </StyledPanel>

        <StyledPanel index='deleteAccount' value={currTab}>
          Tab number {currTab + 1}
        </StyledPanel>
      </TabPanelContainer>
    </Wrapper>
  )
}

export default SettingsTemplate
