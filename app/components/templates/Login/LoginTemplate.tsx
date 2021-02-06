import { useState } from 'react'
import { Button, Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import { IApiError } from 'types'
import FormInput from '@elements/HookForm/FormInput'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import api from '@api/HttpClient'
import {
  combineValidators,
  emailValidator,
  minLengthValidator,
  requiredValidator
} from 'utils/validators'

import { Error, FormContent } from './LoginTemplate.styled'

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
  const [error, setError] = useState<string>()

  const handleSubmitted: OnFormSubmit<IFormValues> = async values => {
    try {
      var response = await api.post('/auth/login', values)
      console.log(response.data)
    } catch (err) {
      setError(t(`validator.${(err as IApiError).response.data.errorMessage}`))
    }
  }

  return (
    <PageMinHeightWrapper center>
      <Card elevation={5}>
        {error && <Error>{error}</Error>}

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

              <Button color='primary' variant='contained' type='submit'>
                {submitting ? t('Submitting') : t('login')}
              </Button>
            </FormContent>
          )}
        </Form>
      </Card>
    </PageMinHeightWrapper>
  )
}

export default LoginTemplate
