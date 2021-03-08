import Link from 'next/link'
import { Add } from '@material-ui/icons'
import Button from '@elements/Button/Button'
import DefaultLayout from '@layouts/DefaultLayout'

const Events = () => {
  return (
    <DefaultLayout title='Events • Fiesta'>
      <Link href='/events/create-event'>
        <Button variant='text' endIcon={<Add />}>
          Create event
        </Button>
      </Link>
    </DefaultLayout>
  )
}

export default Events
