import { Card } from '@material-ui/core'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  height: calc(100vh - ${NAVBAR_HEIGHT}px - 120px);
`
