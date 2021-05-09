import styled from 'styled-components'
import { motion } from 'framer-motion'
import BurgerMenu from 'react-hamburger-menu'
import { AppBar, ButtonGroup, Chip, IconButton, MenuItem } from '@material-ui/core'

import { Container } from '@elements/Container'
import FiestaLogo from '@elements/FiestaLogo'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const NAVBAR_HEIGHT = 80

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.default};
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

export const NavIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.themeText.themeBlack};

  &.active svg {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const MobileMenuItem = styled(MenuItem)`
  width: 100%;
  font-size: 1rem;
  padding: 5px 5%;

  > svg {
    margin-right: 6px;
  }

  &.active {
    svg {
      color: ${({ theme }) => theme.palette.primary.main};
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

  .MuiAvatar-root {
    margin-left: 18px;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  > button {
    margin-left: 6px;
    margin-right: 6px;
  }

  @media screen and (max-width: ${MD}px) {
    position: fixed;
    left: 0px;
    width: 100vw;
    top: ${NAVBAR_HEIGHT}px;
    height: calc(100vh - ${NAVBAR_HEIGHT}px);
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.background.default};
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
    color: ${({ theme }) => theme.palette.themeText.themeWhite} !important;
  }
`
