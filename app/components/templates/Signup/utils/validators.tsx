import { Validator } from 'types'

export const repeatPasswordValidator: Validator = (repeatPassword: string, t, { getValues }) => {
  const { password } = getValues()

  if (repeatPassword !== password) return t('validator.passwordDoesNotMatch')
}
