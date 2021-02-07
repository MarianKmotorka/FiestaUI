import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'

const Home = () => {
  return (
    <AuthorizedPage>
      <DefaultLayout title='Home | Fiesta'>Home</DefaultLayout>
    </AuthorizedPage>
  )
}

export default Home
