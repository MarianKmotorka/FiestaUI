import styled from 'styled-components'
import { MD, SM } from 'utils/theme'

export const AvatarAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;

  .MuiAvatar-root {
    height: 170px;
    width: 170px;
    box-shadow: 0 13px 13px rgba(0, 0, 0, 0.2);
  }

  h1 {
    margin: 11px 0 9px;
    font-size: 2.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.themeText.themeBlack};
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

    ::first-letter {
      color: ${({ theme }) => theme.primary.main};
    }
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.themeText.themeGray};
    font-size: 1.4rem;
  }

  @media screen and (max-width: ${MD}px) {
    margin-top: 10px;

    .MuiAvatar-root {
      height: 130px;
      width: 130px;
    }

    h1 {
      margin: 10px 0 7px;
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: ${SM}px) {
    .MuiAvatar-root {
      height: 100px;
      width: 100px;
    }

    h1 {
      margin: 8px 0 6px;
      font-size: 1.5rem;
    }

    p {
      font-size: 1.05rem;
    }
  }
`
