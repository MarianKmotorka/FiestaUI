import { forwardRef } from 'react'
import { StandardTextFieldProps } from '@material-ui/core'
import { StyledTextBox } from './TextBox.styled'

interface ITextBoxProps extends Omit<StandardTextFieldProps, 'onChange' | 'error'> {
  name?: string
  label?: string
  value: string
  error?: string
  className?: string
  onChange: (value: string) => void
  onBlur?: () => void
}

const TextBox = forwardRef(
  ({ name, label, value, error, onChange, onBlur, ...rest }: ITextBoxProps, forwardRef) => {
    return (
      <StyledTextBox
        {...rest}
        ref={forwardRef as any}
        name={name}
        value={value}
        label={label}
        error={!!error}
        helperText={error}
        onBlur={onBlur}
        onChange={e => onChange(e.target.value)}
      />
    )
  }
)

export default TextBox
