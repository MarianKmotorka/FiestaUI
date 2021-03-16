import DefaultLayout from '@layouts/DefaultLayout'
import useTranslation from 'next-translate/useTranslation'

const UserProfile = () => {
  const { t } = useTranslation('common')

  return <DefaultLayout title={`${t('profile')} • Fiesta`}></DefaultLayout>
}

export default UserProfile
