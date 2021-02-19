import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import useWindowSize from '@hooks/useWindowSize'
import { Tabs } from '@material-ui/core'
import { AccountCircle, DeleteForever, Language, VpnKey } from '@material-ui/icons'
import ChangePasswordTab from './Tabs/ChangePasswordTab/ChangePasswordTab'

import {
  TabPanelContainer,
  TabsContainer,
  StyledTab,
  StyledPanel,
  Wrapper
} from './SettingsTemplate.styled'

const SettingsTemplate = () => {
  const [currTab, setCurrTab] = useState(0)
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()

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
            label={!maxMedium && t('editProfile')}
            icon={maxMedium ? <AccountCircle /> : undefined}
          />
          <StyledTab
            label={!maxMedium && t('changePassword')}
            icon={maxMedium ? <VpnKey /> : undefined}
          />
          <StyledTab
            label={!maxMedium && t('language')}
            icon={maxMedium ? <Language /> : undefined}
          />
          <StyledTab
            label={!maxMedium && t('deleteAccount')}
            icon={maxMedium ? <DeleteForever /> : undefined}
          />
        </Tabs>
      </TabsContainer>

      <TabPanelContainer>
        <StyledPanel index={0} value={currTab}>
          Tab number: {currTab + 1}
        </StyledPanel>

        <StyledPanel index={1} value={currTab}>
          <ChangePasswordTab />
        </StyledPanel>

        <StyledPanel index={2} value={currTab}>
          {new Array(500).fill(null).map(_ => 'Sample text, sample text, sample text')}
        </StyledPanel>

        <StyledPanel index={3} value={currTab}>
          Tab number {currTab + 1}
        </StyledPanel>
      </TabPanelContainer>
    </Wrapper>
  )
}

export default SettingsTemplate
