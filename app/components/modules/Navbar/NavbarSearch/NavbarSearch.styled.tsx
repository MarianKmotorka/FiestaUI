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
  max-height: calc(100% - 150px);
`

export const Item = styled(MenuItem)`
  padding: 13px 8%;
  display: flex;
  gap: 18px;

  > svg {
    margin-left: auto;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 7px 8%;
    gap: 10px;
  }
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 30vw;
  overflow: hidden;

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

    display: flex;
    align-items: center;
    svg {
      font-size: 1em;
      color: ${({ theme }) => theme.themeText.themeBlack};
    }
  }

  @media screen and (max-width: ${LG}px) {
    max-width: 33vw;
  }

  @media screen and (max-width: ${MD}px) {
    max-width: 60vw;
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
