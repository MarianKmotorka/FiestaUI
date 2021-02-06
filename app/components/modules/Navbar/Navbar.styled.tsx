import { Container } from '@elements/Container'
import { AppBar } from '@material-ui/core'
import styled from 'styled-components'

export const NAVBAR_HEIGHT = 80

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg[100]};
`

export const Logo = styled.h1`
  margin-right: auto;
  color: ${({ theme }) => theme.primary.main};
`

export const StyledContainer = styled(Container)`
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  align-items: center;

  justify-content: flex-end;
`
