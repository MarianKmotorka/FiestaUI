import useTranslation from 'next-translate/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'

import { Validator } from '@elements/HookForm/types'
import Select, { ISelectProps } from '@elements/Select/Select'

interface IFormSelectProps extends Omit<ISelectProps, 'value' | 'onChange'> {
  name: string
  label: string
  validate?: Validator
}

const FormSelect = ({ name, disabled, validate: initialValidate, ...rest }: IFormSelectProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          {...rest}
          value={value}
          onChange={onChange}
          error={error?.message}
          disabled={disabled || form.formState.isSubmitting}
        />
      )}
    />
  )
}

export default FormSelect
