import { Card, IconButton, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { LG, MD } from 'utils/theme'

export const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  outline: none;
  min-width: 300px;
  width: 50vw;
  height: 90vh;

  @media screen and (max-width: ${LG}px) {
    width: 60vw;
  }

  @media screen and (max-width: ${MD}px) {
    width: 90vw;
  }
`

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    color: ${({ theme }) => theme.themeText.themeGray};
  }
`

export const ItemsContainer = styled.div`
  overflow: auto;
  max-height: calc(100% - 200px);
`

export const Item = styled(MenuItem)`
  padding: 13px 8%;
  display: flex;
  gap: 18px;

  p {
    margin: 0px;
    line-height: 1.15rem;
    font-weight: 500;
    font-size: 1.1rem;

    ::first-letter {
      color: ${({ theme }) => theme.primary.main};
    }
  }

  span {
    font-size: 0.85em;
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  > svg {
    margin-left: auto;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 7px 8%;
    gap: 7px;
    p {
      font-size: 0.95rem;
    }
    span {
      font-size: 0.7em;
    }
    .MuiAvatar-root {
      width: 33px;
      height: 33px;
    }
  }
`
