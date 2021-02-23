import styled from 'styled-components'
import { motion } from 'framer-motion'
import BurgerMenu from 'react-hamburger-menu'
import { AppBar, ButtonGroup } from '@material-ui/core'

import { Container } from '@elements/Container'
import FiestaLogo from '@elements/FiestaLogo'
import { MD, SM } from 'utils/theme'

export const NAVBAR_HEIGHT = 80

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg[100]};
`

export const Logo = styled(FiestaLogo)`
  margin-right: auto;
  cursor: pointer;
  font-size: 2.5rem !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7) !important;

  @media screen and (max-width: ${SM}px) {
    font-size: 1.7rem !important;
  }
`

export const StyledContainer = styled(Container)`
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  align-items: center;

  justify-content: flex-end;
`

export const LinkText = styled.p`
  color: ${({ theme }) => theme.themeText.themeGray};
  font-size: 1.1rem;
  margin-right: auto;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  &.active {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.primary.main};
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
  }
`

export const Menu = styled(motion.div)`
  display: flex;
  align-items: center;

  .MuiChip-root {
    margin-left: 20px;
    padding: 3px;

    svg {
      pointer-events: none;
      color: ${({ theme }) => theme.themeText.white};
    }

    .MuiChip-label {
      text-overflow: ellipsis;
      max-width: 160px;
      font-size: 1.1em;
    }
  }

  @media screen and (max-width: ${MD}px) {
    position: fixed;
    left: 0px;
    width: 100vw;
    top: ${NAVBAR_HEIGHT}px;
    height: calc(100vh - ${NAVBAR_HEIGHT}px);

    background-color: ${({ theme }) => theme.bg[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 0 50px;

    .MuiChip-root {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;

      font-size: 0.9rem;
      padding: 18px 0;
      border-radius: 100px;

      .MuiAvatar-root {
        width: 30px;
        height: 30px;
      }
    }

    .MuiIconButton-root {
      position: absolute;
      top: 14px;
      left: 5%;
    }
  }
`

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-left: 10px;

  > button {
    min-width: 80px;
  }
`

export const StyledBurger = styled(BurgerMenu)`
  span {
    margin-top: 0 !important;
  }
`
