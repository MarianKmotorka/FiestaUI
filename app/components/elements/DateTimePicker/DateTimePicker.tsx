import { forwardRef } from 'react'
import { DateTimePickerProps as MuiDateTimePickerProps } from '@material-ui/pickers'
import useTranslation from 'next-translate/useTranslation'
import { PickerGlobalStyle, StyledPicker } from './DateTimePicker.styled'

export type DateTimePickerProps = Omit<MuiDateTimePickerProps, 'error'> & {
  name?: string
  label?: string
  value: string
  error?: string
  className?: string
  onChange: (value?: Date) => void
}

const DateTimePicker = forwardRef(
  ({ name, label, value, error, onChange, ...rest }: DateTimePickerProps, ref) => {
    const { t } = useTranslation('common')

    return (
      <>
        <PickerGlobalStyle />

        <StyledPicker
          {...rest}
          ref={ref as any}
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
)

export default DateTimePicker
