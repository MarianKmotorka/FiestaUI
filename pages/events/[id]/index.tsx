import { useRouter } from 'next/router'
import EventDetailTemplate from '@templates/Events/EventDetail/EventDetailTemplate'
import FullWidthLayout from '@layouts/FullWidthLayout'

const EventDetail = () => {
  const { query } = useRouter()

  return (
    <FullWidthLayout title='Event • Fiesta'>
      <EventDetailTemplate eventId={query.id as string} />
    </FullWidthLayout>
  )
}

export default EventDetail
