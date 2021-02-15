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

const FormInput = ({ name, label, type, validate: initialValidate, ...rest }: IFormInputProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      as={
        <TextBox
          {...rest}
          value=''
          name={name}
          type={type}
          label={label}
          onChange={x => x}
          error={errors[name]?.message}
        />
      }
    />
  )
}

export default FormInput
