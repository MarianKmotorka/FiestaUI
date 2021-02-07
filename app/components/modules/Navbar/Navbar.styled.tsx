import { Container } from '@elements/Container'
import FiestaLogo from '@elements/FiestaLogo'
import { AppBar } from '@material-ui/core'
import styled from 'styled-components'
import { SM } from 'utils/theme'

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
