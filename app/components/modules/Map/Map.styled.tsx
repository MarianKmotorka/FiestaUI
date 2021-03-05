import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-top: ${NAVBAR_HEIGHT}px;

  #googleMap {
    width: 100vw;
    height: calc(100vh - ${NAVBAR_HEIGHT}px);
  }
`
