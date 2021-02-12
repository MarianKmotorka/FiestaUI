import { TextField } from '@material-ui/core'
import styled from 'styled-components'

export const StyledTextBox = styled(TextField)`
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  .MuiInputBase-input {
    color: ${({ theme }) => theme.themeText.themeBlack};
  }
`
