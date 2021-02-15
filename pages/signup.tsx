import DefaultLayout from '@layouts/DefaultLayout'
import UnauthorizedPage from '@layouts/UnauthorizedPage'
import SignupTemplate from '@templates/Auth/Signup/SignupTemplate'

const Signup = () => {
  return (
    <UnauthorizedPage>
      <DefaultLayout title='Signup | Fiesta'>
        <SignupTemplate />
      </DefaultLayout>
    </UnauthorizedPage>
  )
}

export default Signup
