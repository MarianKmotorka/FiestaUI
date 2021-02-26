import DefaultLayout from '@layouts/DefaultLayout'
import LoginTemplate from '@templates/Account/Login/LoginTemplate'
import useTranslation from 'next-translate/useTranslation'

const Login = () => {
  const { t } = useTranslation('common')

  return (
    <DefaultLayout title={`${t('login')} • Fiesta`}>
      <LoginTemplate />
    </DefaultLayout>
  )
}

export default Login
