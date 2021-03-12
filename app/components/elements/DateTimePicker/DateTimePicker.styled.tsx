import { DateTimePicker } from '@material-ui/pickers'
import styled, { createGlobalStyle } from 'styled-components'

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

//Note: order of these rules is important
export const PickerGlobalStyle = createGlobalStyle`
.MuiPickersBasePicker-pickerView{
  .MuiPickersDay-day,.MuiPickersCalendarHeader-switchHeader,.MuiPickersYear-root,.MuiPickersClockNumber-clockNumber , svg {
    color:${({ theme }) => theme.themeText.themeBlack};
  }
  .MuiPickersDay-current, .MuiPickersYear-yearSelected{
    color:${({ theme }) => theme.primary.main};
  }
  .MuiPickersDay-daySelected,.MuiPickersClockNumber-clockNumberSelected {
    color:${({ theme }) => theme.themeText.white};
  }
  .MuiPickersDay-dayDisabled, .MuiPickersCalendarHeader-dayLabel, .MuiPickersYear-yearDisabled {
    color:${({ theme }) => theme.grey[500]};
  }
}
`
