import styled from 'styled-components'
import { motion } from 'framer-motion'
import BurgerMenu from 'react-hamburger-menu'
import { AppBar, ButtonGroup, Chip, MenuItem } from '@material-ui/core'

import { Container } from '@elements/Container'
import FiestaLogo from '@elements/FiestaLogo'
import { MD, SM, XL } from '@contextProviders/AppThemeProvider/theme'

export const NAVBAR_HEIGHT = 80

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.background.default};
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

export const LinkContent = styled.p`
  color: ${({ theme }) => theme.secondary.main};
  font-size: 1.1rem;
  margin-right: auto;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s;
  border-bottom: 2px solid transparent;

  display: flex;
  align-items: center;
  gap: 5px;

  :hover {
    border-color: ${({ theme }) => theme.secondary.main};
  }

  &.active {
    border-color: ${({ theme }) => theme.primary.main};
    svg {
      color: ${({ theme }) => theme.primary.main};
    }
  }

  @media screen and (max-width: ${XL}px) {
    span {
      display: none;
    }
  }
`

export const MobileMenuItem = styled(MenuItem)`
  width: 100%;
  font-size: 1.1rem;
  padding: 5px 5%;

  > svg {
    margin-right: 6px;
  }

  &.active {
    svg {
      color: ${({ theme }) => theme.primary.main};
    }
  }

  .MuiAvatar-root {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`

export const Menu = styled(motion.div)`
  display: flex;
  align-items: center;

  .MuiChip-root {
    margin-left: 20px;
    padding: 4px;

    svg {
      pointer-events: none;
      color: ${({ theme }) => theme.themeText.white};
    }

    .MuiChip-label {
      text-overflow: ellipsis;
      max-width: 160px;
      font-size: 1.25em;
      font-weight: 500;
      margin: 0 2px;
    }
  }

  @media screen and (max-width: ${MD}px) {
    position: fixed;
    left: 0px;
    width: 100vw;
    top: ${NAVBAR_HEIGHT}px;
    height: calc(100vh - ${NAVBAR_HEIGHT}px);
    flex-direction: column;
    background-color: ${({ theme }) => theme.background.default};
  }
`

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-left: 10px;

  > button {
    min-width: 80px;
    border-radius: 0;
    box-shadow: none;
  }
`

export const StyledBurger = styled(BurgerMenu)`
  span {
    margin-top: 0 !important;
  }
`

export const SearchChip = styled(Chip)`
  cursor: pointer;
  svg {
    background-color: transparent !important;
    color: ${({ theme }) => theme.themeText.themeWhite} !important;
  }
`
