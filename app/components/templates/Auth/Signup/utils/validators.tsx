import { Validator } from 'types'
import { ISignupFormValues } from '../SignupTemplate'

export const repeatPasswordValidator: Validator<ISignupFormValues> = (
  repeatPassword: string,
  t,
  { getValues }
) => {
  const { password } = getValues()

  if (repeatPassword !== password) return t('validator.passwordDoesNotMatch')
}
