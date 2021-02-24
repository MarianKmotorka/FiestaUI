import styled from 'styled-components'
import { LG, MD } from 'utils/theme'

export const Wrapper = styled.div`
  .MuiAccordionSummary-root svg {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  .MuiAccordionDetails-root {
    display: block;
  }

  .MuiChip-root {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;

    > * + * {
      margin-top: 10px;
    }

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

export const Title = styled.h1`
  font-weight: 300;
  color: ${({ theme }) => theme.themeText.themeBlack};
  font-size: 1.2rem;

  @media screen and (max-width: ${LG}px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1rem;
  }
`
