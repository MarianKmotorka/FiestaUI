import styled from 'styled-components'
import { MD } from 'utils/theme'

export const Wrapper = styled.div`
  .MuiAccordionSummary-root svg {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  .MuiAccordionDetails-root {
    display: block;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;

    button {
      width: 90px;
      margin-top: 20px;
    }
  }

  @media screen and (min-width: ${MD}px) {
    padding-left: 30px;
  }

  .MuiAccordion-root {
    padding: 0 7px 10px;

    @media screen and (max-width: ${MD}px) {
      padding: 0;
    }
  }
`
