import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'
import CreateEventTemplate from '@templates/CreateEvent/CreateEventTemplate'

const CreateEvent = () => {
  return (
    <AuthorizedPage>
      <DefaultLayout title='Create event • Fiesta'>
        <CreateEventTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default CreateEvent
