import { Box, Tab, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { StyledPanel } from './UserDetailTabs.styled'

interface IUserDetailTabsProps {}

const UserDetailTabs = ({}: IUserDetailTabsProps) => {
  const { t } = useTranslation('common')
  const [currTab, setCurrTab] = useState('attendedEvents')

  return (
    <>
      <Tabs
        value={currTab}
        onChange={(_, value) => setCurrTab(value)}
        indicatorColor='primary'
        variant='scrollable'
      >
        <Tab value='attendedEvents' label={t('attendedEvents')} />
        <Tab value='organizedEvents' label={t('organizedEvents')} />
      </Tabs>

      <Box minHeight='400px'>
        <StyledPanel index='attendedEvents' value={currTab}>
          attendedEvents
        </StyledPanel>

        <StyledPanel index='organizedEvents' value={currTab}>
          organizedEvents
        </StyledPanel>
      </Box>
    </>
  )
}

export default UserDetailTabs
