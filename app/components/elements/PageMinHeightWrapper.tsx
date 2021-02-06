import styled, { css } from 'styled-components'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

export const PageMinHeightWrapper = styled.div<{ center?: boolean }>`
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  padding-bottom: 100px;
  ${({ center }) =>
    center &&
    css`
      display: grid;
      place-items: center;
    `}
`
