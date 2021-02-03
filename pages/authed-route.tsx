import AuthorizedLayout from '@layouts/AuthorizedLayout'
import DefaultLayout from '@layouts/DefaultLayout'
import UserProfile from '@templates/UserProfile'

export default function AuthedRoute() {
  return (
    <AuthorizedLayout>
      <DefaultLayout>
        <UserProfile />
      </DefaultLayout>
    </AuthorizedLayout>
  )
}
