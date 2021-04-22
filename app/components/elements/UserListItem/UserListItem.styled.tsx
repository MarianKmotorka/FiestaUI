import { SM } from '@contextProviders/AppThemeProvider/theme'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components'

export const StyledAvatar = styled(Avatar)`
  @media screen and (max-width: ${SM}px) {
    width: 36px;
    height: 36px;
  }
`

export const Wrapper = styled.div<{ cursor: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 10px;
  cursor: ${({ cursor }) => cursor};
`

export const ItemText = styled.p`
  ${({ theme }) => theme.typography.body1 as any};
  margin: 0;

  ::first-letter {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const ItemSubText = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body2 as any};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.palette.themeText.themeGray};
`
