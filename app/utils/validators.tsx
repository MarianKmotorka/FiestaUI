import { Translate } from 'next-translate'
import { UseFormMethods } from 'react-hook-form'
import { Validator } from 'types'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const combineValidators = (validators: Validator[]) => (
  value: any,
  t: Translate,
  form: UseFormMethods<Record<string, any>>
) => {
  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i]
    const result = validator?.(value, t, form)
    if (result) return result
  }
}

export const emailValidator: Validator = (email: string, t) => {
  if (!email) return undefined
  return emailRegex.test(email) ? undefined : t('validator.invalidEmail')
}

export const requiredValidator: Validator = (value, t) =>
  value ? undefined : t('validator.required')

export const minLengthValidator = (minLength: number): Validator => (value: string, t) => {
  if (value) return value.length < minLength ? t('validator.minLength', { minLength }) : undefined
}

export const createRepeatPasswordValidator = (otherPasswordFieldName: string): Validator => (
  repeatPassword: string,
  t,
  { getValues }
) => {
  const otherPassword = getValues()[otherPasswordFieldName]
  return repeatPassword !== otherPassword ? t('validator.passwordDoesNotMatch') : undefined
}
