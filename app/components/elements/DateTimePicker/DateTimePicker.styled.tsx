import { DateTimePicker } from '@material-ui/pickers'
import styled from 'styled-components'

export const StyledPicker = styled(DateTimePicker)`
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.themeText.themeGray};
  }

  .MuiInputBase-input {
    color: ${({ theme }) => theme.themeText.themeBlack};
  }

  .MuiFormLabel-root {
    font-weight: 300;
  }
`
