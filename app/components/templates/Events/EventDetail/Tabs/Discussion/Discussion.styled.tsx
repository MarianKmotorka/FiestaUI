import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { SM } from '@contextProviders/AppThemeProvider/theme'

export const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  @media screen and (max-width: ${SM}px) {
    width: 36px;
    height: 36px;
  }
`
