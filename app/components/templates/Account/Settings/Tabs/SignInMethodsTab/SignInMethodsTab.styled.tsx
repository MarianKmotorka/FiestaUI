import styled from 'styled-components'
import { LG, MD } from 'utils/theme'

export const Wrapper = styled.div`
  .MuiAccordionSummary-root svg {
    color: ${({ theme }) => theme.themeText.themeGray};
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

export const InfoText = styled.p`
  color: ${({ theme }) => theme.success.main};
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  margin-bottom: 8px;
  gap: 10px;

  .MuiChip-root {
    background-color: ${({ theme }) => theme.success.light};
    color: ${({ theme }) => theme.themeText.black};
  }

  svg {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 0.9rem;
  }
`