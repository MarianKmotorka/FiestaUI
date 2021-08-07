import { MD } from '@contextProviders/AppThemeProvider/theme'
import TabPanel from '@elements/TabPanel/TabPanel'
import styled from 'styled-components'

export const StyledPanel = styled(TabPanel)`
  margin-top: 30px;

  @media screen and (max-width: ${MD}px) {
    margin-top: 15px;
  }
`
