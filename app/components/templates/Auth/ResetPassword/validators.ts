import { Validator } from 'types'
import { IFormValues as IResetPasswordFormValues } from './ResetPasswordTemplate'

export const repeatPasswordValidator: Validator<IResetPasswordFormValues> = (
  repeatPassword: string,
  t,
  { getValues }
) => {
  const { newPassword } = getValues()
  return repeatPassword !== newPassword ? t('validator.passwordDoesNotMatch') : undefined
}
