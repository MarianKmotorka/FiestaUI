import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { requiredValidator } from 'utils/validators'

interface IFormValues {
  password: string
}

const defaultValues: IFormValues = {
  password: ''
}

const DeleteWithPassword = () => {
  const { t } = useTranslation('common')
  const { logout } = useAuthorizedUser()

  const handleSubmitted: OnFormSubmit<IFormValues> = async ({ password }, submit, { setError }) => {
    await submit({
      data: {
        password
      },
      url: '/auth/delete-account-with-password',
      method: 'delete',
      successCallback: logout,
      errorCallback: err => {
        if (err.errorDetails.length === 0)
          setError('password', { message: t(`validator.${err.errorMessage}`) })
      }
    })
  }

  return (
    <Form defaultValues={defaultValues} onSubmit={handleSubmitted}>
      {({ submitting }) => (
        <>
          <FormInput
            fullWidth
            name='password'
            type='password'
            label={t('password')}
            validate={requiredValidator}
          />
          <Button type='submit' loading={submitting}>
            {t('delete')}
          </Button>
        </>
      )}
    </Form>
  )
}

export default DeleteWithPassword
