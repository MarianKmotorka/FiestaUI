import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import api from '@api/HttpClient'
import { IApiError } from '@api/types'
import DefaultLayout from '@layouts/DefaultLayout'
import AuthorizedPage from '@layouts/AuthorizedPage'
import { useAuth } from '@contextProviders/AuthProvider'
import CreateOrUpdateEventTemplate from '@templates/Events/CreateOrUpdateEvent/CreateOrUpdateEventTemplate'

const UpdateEvent = () => {
  const auth = useAuth()
  const { query } = useRouter()

  const { isLoading, error, data, isIdle } = useQuery<any, IApiError>(
    ['events', query.id, 'update'],
    async () => {
      const { data } = await api.get(`/events/${query.id}/update`)
      return { ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) }
    },
    {
      enabled: !!query.id && auth.isLoggedIn,
      cacheTime: 0 // cache time needs to be zero for edits, otherwise form initialValues are set from cache
    }
  )

  return (
    <AuthorizedPage>
      <DefaultLayout title='Edit event • Fiesta'>
        <CreateOrUpdateEventTemplate
          event={data}
          eventFetching={isLoading || isIdle}
          fetchError={error}
        />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default UpdateEvent
