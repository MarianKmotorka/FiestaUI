import styled from 'styled-components'

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.palette.themeText.themeGray};
  cursor: pointer;
  height: max-content;

  :hover,
  :focus {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
`
