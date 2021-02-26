import { useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Divider from '@elements/Divider'
import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { useAuth } from '@contextProviders/AuthProvider'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import ConfirmEmailDialog from './ConfirmEmailDialog/ConfirmEmailDialog'
import ForgotPasswordDialog from './ForgotPasswordDialog/ForgotPasswordDialog'
import { getGoogleLoginUrl, loginWithEmailAndPassword } from 'services/authService'
import {
  combineValidators,
  emailValidator,
  minLengthValidator,
  requiredValidator
} from 'utils/validators'

import { FormContent, StyledCard, StyledForgotPasswordButton } from './LoginTemplate.styled'

interface IFormValues {
  email: string
  password: string
}

const defaultValues: IFormValues = {
  email: '',
  password: ''
}

const LoginTemplate = () => {
  const { t } = useTranslation('common')
  const { fetchUser } = useAuth()
  const router = useRouter()
  const [emailToConfirm, setEmailToConfirm] = useState<string>()
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)

  const handleGoogleLogin = () => {
    const url = getGoogleLoginUrl(router.query.redirectedFrom as string)
    window.location.assign(url)
  }

  const handleSubmitted: OnFormSubmit<IFormValues> = async (values, _, { setError }) => {
    setError('email', { message: undefined })
    const successOrError = await loginWithEmailAndPassword(values)

    if (successOrError !== true) {
      if (successOrError === 'emailIsNotVerified') setEmailToConfirm(values.email)
      return setError('email', { message: t(`validator.${successOrError}`) })
    }

    await fetchUser()
    router.replace((router.query.redirectedFrom as string) || '/home')
  }

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <Form onSubmit={handleSubmitted} defaultValues={defaultValues}>
          {({ submitting }) => (
            <FormContent>
              <FormInput
                name='email'
                label={t('emailAddress')}
                validate={combineValidators([requiredValidator, emailValidator])}
              />
              <FormInput
                name='password'
                label={t('password')}
                type='password'
                validate={combineValidators([requiredValidator, minLengthValidator(6)])}
              />

              <Button type='submit' loading={submitting}>
                {t('login')}
              </Button>
            </FormContent>
          )}
        </Form>

        <StyledForgotPasswordButton
          variant='text'
          color='secondary'
          onClick={() => setShowResetPasswordDialog(true)}
        >
          {t('login:forgotPassword')}?
        </StyledForgotPasswordButton>

        <Divider />

        <Button color='secondary' onClick={handleGoogleLogin}>
          {t('login:loginWithGoogle')}
        </Button>
      </StyledCard>

      {emailToConfirm && (
        <ConfirmEmailDialog email={emailToConfirm} onClose={() => setEmailToConfirm(undefined)} />
      )}

      {showResetPasswordDialog && (
        <ForgotPasswordDialog onClose={() => setShowResetPasswordDialog(false)} />
      )}
    </PageMinHeightWrapper>
  )
}

export default LoginTemplate
