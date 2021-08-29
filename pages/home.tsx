import Link from 'next/link'
import { Add } from '@material-ui/icons'
import Button from '@elements/Button/Button'
import DefaultLayout from '@layouts/DefaultLayout'
import AuthorizedPage from '@layouts/AuthorizedPage'

const Home = () => {
  return (
    <AuthorizedPage>
      <DefaultLayout title='Home • Fiesta'>
        <Link href='/events/create-event'>
          <Button variant='text' endIcon={<Add />}>
            Create event
          </Button>
        </Link>
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default Home
