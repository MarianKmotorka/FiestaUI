import DefaultLayout from '@layouts/DefaultLayout'
import UnauthorizedPage from '@layouts/UnauthorizedPage'
import SignupTemplate from '@templates/Account/Signup/SignupTemplate'
import useTranslation from 'next-translate/useTranslation'

const Signup = () => {
  const { t } = useTranslation('common')

  return (
    <UnauthorizedPage>
      <DefaultLayout title={`${t('signup')} • Fiesta`}>
        <SignupTemplate />
      </DefaultLayout>
    </UnauthorizedPage>
  )
}

export default Signup
