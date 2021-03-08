import { DateTimePickerProps as MuiDateTimePickerProps } from '@material-ui/pickers'
import { StyledPicker } from './DateTimePicker.styled'

export type DateTimePickerProps = MuiDateTimePickerProps & {
  name?: string
  label?: string
  value: string
  error?: string
  className?: string
  onChange: (value?: Date) => void
}

const DateTimePicker = ({ name, label, value, error, onChange, ...rest }: DateTimePickerProps) => {
  return (
    <StyledPicker
      {...rest}
      name={name}
      label={label}
      value={value || null}
      onChange={x => onChange(x?.toDate())}
      error={!!error}
      helperText={error}
    />
  )
}

export default DateTimePicker
