import DefaultLayout from '@layouts/DefaultLayout'
import UnauthorizedPage from '@layouts/UnauthorizedPage'
import LoginTemplate from '@templates/Auth/Login/LoginTemplate'

const Login = () => {
  return (
    <UnauthorizedPage>
      <DefaultLayout title='Login | Fiesta'>
        <LoginTemplate />
      </DefaultLayout>
    </UnauthorizedPage>
  )
}

export default Login
