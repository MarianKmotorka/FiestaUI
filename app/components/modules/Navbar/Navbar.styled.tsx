import { Container } from '@elements/Container'
import { AppBar } from '@material-ui/core'
import styled from 'styled-components'
import { SM } from 'utils/theme'

export const NAVBAR_HEIGHT = 80

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg[100]};
`

export const Logo = styled.h1`
  margin-right: auto;
  cursor: pointer;
  color: ${({ theme }) => theme.primary.main};
  font-size: 2.5rem;

  @media screen and (max-width: ${SM}px) {
    font-size: 1.9rem;
  }
`

export const StyledContainer = styled(Container)`
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  align-items: center;

  justify-content: flex-end;
`
