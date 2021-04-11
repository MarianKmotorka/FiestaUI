import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div`
  display: flex;
  border-radius: 3px;
  font-size: 1.1em;
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  padding: 0 10px;

  @media screen and (max-width: ${MD}px) {
    font-size: 0.95em;
  }

  :nth-child(even) {
    background-color: ${({ theme }) =>
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]};
  }
`

export const Value = styled.p``

export const Key = styled.p<{ keyWidth: string }>`
  margin-right: 10px;
  font-weight: 500;
  min-width: ${({ keyWidth }) => keyWidth};
  display: block;

  ::after {
    content: ':';
  }
`
