import { Controller, useFormContext } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'

import { Validator } from 'types'
import TextBox, { TextBoxProps } from '@elements/TextBox/TextBox'

interface IFormInputProps extends Omit<TextBoxProps, 'value' | 'onChange'> {
  name: string
  label?: string
  type?: string
  placeholder?: string
  validate?: Validator<any>
}

const FormInput = ({
  name,
  label,
  type,
  disabled,
  validate: initialValidate,
  ...rest
}: IFormInputProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={props => (
        <TextBox
          {...props}
          {...rest}
          type={type}
          label={label}
          error={errors[name]?.message}
          disabled={disabled || form.formState.isSubmitting}
        />
      )}
    />
  )
}

export default FormInput
