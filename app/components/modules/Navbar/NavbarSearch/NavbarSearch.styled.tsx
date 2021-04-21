import styled from 'styled-components'
import { LG, MD } from '@contextProviders/AppThemeProvider/theme'

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 30vw;
  overflow: hidden;

  p {
    margin: 0px;
    line-height: 1.4rem;
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  span {
    font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    line-height: 1.15rem;
    display: flex;
    align-items: center;
    svg {
      font-size: 1em;
      color: ${({ theme }) => theme.palette.themeText.themeBlack};
    }
  }

  @media screen and (max-width: ${LG}px) {
    max-width: 40vw;
  }

  @media screen and (max-width: ${MD}px) {
    max-width: 60vw;
    p {
      line-height: 1.25rem;
    }

    span {
      font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
      line-height: 1rem;
    }

    .MuiAvatar-root {
      width: 33px;
      height: 33px;
    }
  }
`
