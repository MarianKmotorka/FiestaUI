import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import DefaultLayout from '@layouts/DefaultLayout'
import UserDetailTemplate from '@templates/Users/UserDetail/UserDetailTemplate'

const UserProfile = () => {
  const { t } = useTranslation('common')
  const { query } = useRouter()

  return (
    <DefaultLayout title={`${t('profile')} • Fiesta`}>
      <UserDetailTemplate userId={query.id as string} />
    </DefaultLayout>
  )
}

export default UserProfile
