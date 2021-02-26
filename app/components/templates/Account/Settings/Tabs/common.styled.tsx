import { Accordion } from '@material-ui/core'
import styled from 'styled-components'
import { MD } from 'utils/theme'

export const SettingsAccordion = styled(Accordion)`
  .MuiAccordionSummary-root svg {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  .MuiAccordionDetails-root {
    display: block;
  }

  padding: 0 7px 10px;

  @media screen and (max-width: ${MD}px) {
    padding: 0;
  }
`
