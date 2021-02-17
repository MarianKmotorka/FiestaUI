import DefaultLayout from '@layouts/DefaultLayout'
import UnauthorizedPage from '@layouts/UnauthorizedPage'
import LoginTemplate from '@templates/Account/Login/LoginTemplate'
import useTranslation from 'next-translate/useTranslation'

const Login = () => {
  const { t } = useTranslation('common')

  return (
    <UnauthorizedPage>
      <DefaultLayout title={`${t('login')} • Fiesta`}>
        <LoginTemplate />
      </DefaultLayout>
    </UnauthorizedPage>
  )
}

export default Login
