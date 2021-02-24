import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import TabPanel from '@elements/TabPanel/TabPanel'
import { Tab } from '@material-ui/core'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import styled from 'styled-components'
import { MD } from 'utils/theme'

export const Wrapper = styled(PageMinHeightWrapper)`
  display: flex;
  width: 100%;

  @media screen and (max-width: ${MD}px) {
    flex-direction: column-reverse;
  }
`

export const TabsContainer = styled.div`
  position: relative;
  min-width: 200px;
  max-width: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  color: ${({ theme }) => theme.themeText.themeBlack};
  border-right: 1px solid ${({ theme }) => theme.themeText.themeBlack}26;

  @media screen and (max-width: ${MD}px) {
    max-width: 100%;
    border: none;
    margin-bottom: 5px;
    flex: 0;

    .MuiTabs-indicator {
      top: 0px;
    }

    .MuiTab-root {
      min-width: 70px;
    }
  }
`

export const TabPanelContainer = styled.div`
  flex: 3;
`

export const StyledTab = styled(Tab)`
  font-size: 0.9rem;
  text-align: start;
  padding: 15px 0;
`

export const StyledPanel = styled(TabPanel)`
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: ${MD}px) {
    height: calc(100vh - ${NAVBAR_HEIGHT}px - 60px);
  }
`
