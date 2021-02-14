import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import SignupSuccessDialog from './SignupSuccessDialog/SignupSuccessDialog'
import {
  combineValidators,
  emailValidator,
  minLengthValidator,
  requiredValidator
} from 'utils/validators'
import { repeatPasswordValidator } from './utils/validators'

import { FormContent, StyledCard } from './SignupTemplate.styled'

interface IFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

const defaultValues: IFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const SignupTemplate = () => {
  const { t } = useTranslation('common')
  const [success, setSuccess] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState('')

  const handleSubmitted: OnFormSubmit<IFormValues> = async (values, submitHandler) => {
    await submitHandler({
      data: values,
      url: '/auth/register',
      successCallback: () => {
        setSuccess(true)
        setConfirmationEmail(values.email)
      }
    })
  }

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <Form onSubmit={handleSubmitted} defaultValues={defaultValues}>
          {({ submitting }) => (
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
                validate={combineValidators([requiredValidator, repeatPasswordValidator])}
              />

              <Button type='submit' loading={submitting}>
                {t('signup')}
              </Button>
            </FormContent>
          )}
        </Form>
      </StyledCard>

      {success && <SignupSuccessDialog email={confirmationEmail} />}
    </PageMinHeightWrapper>
  )
}

export default SignupTemplate
