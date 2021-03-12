import { DateTimePickerProps as MuiDateTimePickerProps } from '@material-ui/pickers'
import useTranslation from 'next-translate/useTranslation'
import { PickerGlobalStyle, StyledPicker } from './DateTimePicker.styled'

export type DateTimePickerProps = MuiDateTimePickerProps & {
  name?: string
  label?: string
  value: string
  error?: string
  className?: string
  onChange: (value?: Date) => void
}

const DateTimePicker = ({ name, label, value, error, onChange, ...rest }: DateTimePickerProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      <PickerGlobalStyle />

      <StyledPicker
        {...rest}
        name={name}
        label={label}
        value={value || null}
        onChange={x => onChange(x?.toDate())}
        error={!!error}
        helperText={error}
        clearLabel={t('clear')}
        cancelLabel={t('cancel')}
      />
    </>
  )
}

export default DateTimePicker
