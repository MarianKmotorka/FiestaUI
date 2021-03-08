import styled from 'styled-components'

export const Wrapper = styled.div`
  .MuiAutocomplete-root {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    max-width: 300px;
    width: 100%;

    .MuiInputBase-root {
      background-color: ${({ theme }) => theme.background.default};
      color: ${({ theme }) => theme.themeText.themeBlack};

      svg {
        color: ${({ theme }) => theme.themeText.themeGray};
      }
    }
  }
`

export const OptionText = styled.p`
  color: ${({ theme }) => theme.themeText.themeBlack};
  font-size: 0.85em;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.themeText.themeGray};
    margin-right: 10px;
  }
`
