import { useRouter } from 'next/router'
import { Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import { getReturnUrlFromQuery } from 'utils/utils'
import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { useAuth } from '@contextProviders/AuthProvider'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { getGoogleLoginUrl, loginWithEmailAndPassword } from 'services/authService'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import {
  combineValidators,
  emailValidator,
  minLengthValidator,
  requiredValidator
} from 'utils/validators'

import { FormContent, StyledCard } from './LoginTemplate.styled'

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

  const handleGoogleLogin = () => {
    const url = getGoogleLoginUrl(router.query.redirectedFrom as string)
    window.location.assign(url)
  }

  const handleSubmitted: OnFormSubmit<IFormValues> = async (values, { setError }) => {
    setError('email', { message: undefined })
    const successOrError = await loginWithEmailAndPassword(values)

    if (successOrError !== true)
      return setError('email', { message: t(`validator.${successOrError}`) })

    await fetchUser()
    router.replace(getReturnUrlFromQuery(router.query) || '/home')
  }

  return (
    <PageMinHeightWrapper center>
      <StyledCard elevation={5}>
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

        <Divider />

        <Button color='secondary' onClick={handleGoogleLogin}>
          {t('login:loginWithGoogle')}
        </Button>
      </StyledCard>
    </PageMinHeightWrapper>
  )
}

export default LoginTemplate
