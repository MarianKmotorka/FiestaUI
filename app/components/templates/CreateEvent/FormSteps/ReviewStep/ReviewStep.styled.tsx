import styled from 'styled-components'
import { MD } from 'utils/theme'

export const Wrapper = styled.div``

export const Title = styled.h1`
  color: ${({ theme }) => theme.themeText.themeBlack};
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .MuiIconButton-root {
    color: ${({ theme }) => theme.themeText.themeGray};
    svg {
      font-size: 0.9em;
    }
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`