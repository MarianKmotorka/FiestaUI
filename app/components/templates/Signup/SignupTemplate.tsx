import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Form from '@elements/HookForm/Form'
import FormInput from '@elements/HookForm/FormInput'
import SubmitButton from '@elements/HookForm/SubmitButton'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import SignupSuccessDialog from './SignupSuccessDialog/SignupSuccessDialog'
import {
  emailValidator,
  requiredValidator,
  combineValidators,
  minLengthValidator,
  createRepeatPasswordValidator
} from 'utils/validators'

import { FormContent, StyledCard } from './SignupTemplate.styled'

export interface ISignupFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

const defaultValues: ISignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: ''
}

const SignupTemplate = () => {
  const { t } = useTranslation('common')
  const [confirmationEmail, setConfirmationEmail] = useState<string>()

  const { onSubmit } = useSubmitForm<ISignupFormValues>({
    url: '/auth/register',
    successCallback: (_, { email }) => setConfirmationEmail(email)
  })

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <FormContent>
            <FormInput name='firstName' label={t('firstName')} validate={requiredValidator} />

            <FormInput name='lastName' label={t('lastName')} validate={requiredValidator} />

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

            <FormInput
              name='repeatPassword'
              label={t('repeatPassword')}
              type='password'
              validate={combineValidators([
                requiredValidator,
                createRepeatPasswordValidator('password')
              ])}
            />

            <SubmitButton>{t('signup')}</SubmitButton>
          </FormContent>
        </Form>
      </StyledCard>

      {confirmationEmail && <SignupSuccessDialog email={confirmationEmail} />}
    </PageMinHeightWrapper>
  )
}

export default SignupTemplate
