import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import Button from '@elements/Button/Button'
import Snackbar from '@elements/Snackbar/Snackbar'
import FormInput from '@elements/HookForm/FormInput'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import {
  requiredValidator,
  combineValidators,
  minLengthValidator,
  createRepeatPasswordValidator
} from 'utils/validators'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { FormContent, Wrapper } from './ChangePasswordTab.styled'

export interface IChangePasswordValues {
  userId: string
  currentPassword: string
  newPassword: string
  repeatPassword: string
}

const defaultValues: IChangePasswordValues = {
  userId: '',
  currentPassword: '',
  newPassword: '',
  repeatPassword: ''
}

const ChangePasswordTab = () => {
  const { t } = useTranslation('common')
  const [success, setSuccess] = useState(false)
  const { currentUser } = useAuthorizedUser()

  const handleSubmitted: OnFormSubmit<IChangePasswordValues> = async (
    values,
    submitHandler,
    { setError }
  ) => {
    await submitHandler({
      data: { ...values, userId: currentUser.id },
      url: '/auth/change-password',
      successCallback: () => setSuccess(true),
      errorCallback: err => {
        if (err.errorDetails.length === 0)
          setError('currentPassword', { message: t(`validator.${err.errorMessage}`) })
      }
    })
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmitted} defaultValues={defaultValues}>
        {({ submitting }) => (
          <FormContent>
            <FormInput
              name='currentPassword'
              label={t('currentPassword')}
              type='password'
              validate={requiredValidator}
            />

            <FormInput
              name='newPassword'
              label={t('newPassword')}
              type='password'
              validate={combineValidators([requiredValidator, minLengthValidator(6)])}
            />

            <FormInput
              name='repeatPassword'
              label={t('repeatPassword')}
              type='password'
              validate={combineValidators([
                requiredValidator,
                createRepeatPasswordValidator('newPassword')
              ])}
            />

            <Button type='submit' loading={submitting}>
              {t('changePassword')}
            </Button>
          </FormContent>
        )}
      </Form>

      {success && <Snackbar onClose={() => setSuccess(false)} translationKey='success' />}
    </Wrapper>
  )
}

export default ChangePasswordTab
