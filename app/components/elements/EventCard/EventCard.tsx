import moment from 'moment'
import Link from 'next/link'
import Linkify from '@elements/Linkify'
import {
  ChevronRightRounded,
  LocationOnOutlined,
  PeopleOutline,
  PersonOutlined,
  Schedule
} from '@material-ui/icons'

import { toLocalTime } from '@utils/utils'

import {
  BannerWrapper,
  BottomWrapper,
  CardWrapper,
  StartDate,
  TopWrapper
} from './EventCard.styled'

interface IEventCardProps {
  id: string
  startDate: string
  description?: string
  attendeesCount: number
  capacity: number
  name: string
  bannerUrl?: string
  location: string
  organizerUsername: string
  organizerId: string
}

const EventCard = ({
  id,
  startDate,
  description,
  attendeesCount,
  capacity,
  name,
  bannerUrl,
  location,
  organizerUsername,
  organizerId
}: IEventCardProps) => {
  return (
    <CardWrapper>
      <TopWrapper>
        <Link href={`/events/${id}`}>
          <BannerWrapper>
            <img className='banner' src={bannerUrl || '/EventDefaultBanner.png'} alt='banner' />
          </BannerWrapper>
        </Link>
      </TopWrapper>

      <BottomWrapper>
        <Link href={`/events/${id}`}>
          <StartDate className='start-date-avatar' data-month={moment(startDate).format('MMM')}>
            <span>{new Date(startDate).getDate()}</span>
            <ChevronRightRounded />
          </StartDate>
        </Link>

        <h3>
          <span>{name[0]}</span>
          {name.slice(-name.length + 1)}
        </h3>

        <div className='event-info'>
          <p>
            <PersonOutlined />
            <Link href={`/users/${organizerId}`}>
              <span className='username'>{organizerUsername}</span>
            </Link>
          </p>
          <p>
            <PeopleOutline />
            {attendeesCount}/{capacity}
          </p>
          <p>
            <Schedule />
            {toLocalTime(startDate, 'DD MMMM yyyy')}
          </p>
          <p>
            <LocationOnOutlined />
            {location}
          </p>

          <p className='event-description'>
            <Linkify>{description}</Linkify>
          </p>
        </div>
      </BottomWrapper>
    </CardWrapper>
  )
}

export default EventCard
