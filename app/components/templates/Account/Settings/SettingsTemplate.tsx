import TabPanel from '@elements/TabPanel/TabPanel'
import useWindowSize from '@hooks/useWindowSize'
import { Tabs } from '@material-ui/core'
import { AccountCircle, DeleteForever, Language, VpnKey } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { TabPanelContainer, TabsContainer, StyledTab, Wrapper } from './SettingsTemplate.styled'

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
        <TabPanel index={0} value={currTab}>
          Tab number: {currTab + 1}
        </TabPanel>

        <TabPanel index={1} value={currTab}>
          Tab number: {currTab + 1}
        </TabPanel>

        <TabPanel index={2} value={currTab}>
          {new Array(500).fill(null).map(_ => 'Sample text, sample text, sample text')}
        </TabPanel>

        <TabPanel index={3} value={currTab}>
          Tab number {currTab + 1}
        </TabPanel>
      </TabPanelContainer>
    </Wrapper>
  )
}

export default SettingsTemplate
