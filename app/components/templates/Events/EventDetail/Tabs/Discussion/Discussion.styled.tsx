import styled, { css } from 'styled-components'
import { Avatar } from '@material-ui/core'
import { SM } from '@contextProviders/AppThemeProvider/theme'

export const StyledAvatar = styled(Avatar)<{ small?: boolean }>`
  cursor: pointer;
  @media screen and (max-width: ${SM}px) {
    width: 36px;
    height: 36px;
  }

  ${({ small }) =>
    small &&
    css`
      width: 30px;
      height: 30px;
      @media screen and (max-width: ${SM}px) {
        width: 25px;
        height: 25px;
      }
    `}
`
