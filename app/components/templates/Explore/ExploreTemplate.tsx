import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { CircularProgress } from '@material-ui/core'
import {
  ChevronRightRounded,
  Explore,
  LocationOn,
  People,
  Person,
  Schedule
} from '@material-ui/icons'

import api from '@api/HttpClient'
import { IEventDto } from 'domainTypes'
import Observer from '@elements/Observer'
import { toLocalTime } from '@utils/utils'
import FetchError from '@elements/FetchError/FetchError'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'

import {
  StartDate,
  BannerWrapper,
  BottomWrapper,
  CardWrapper,
  TopWrapper as TopWrapper,
  Wrapper,
  PageTitle,
  ExploreGrid
} from './ExploreTemplate.styled'
import Linkify from '@elements/Linkify'

interface IExploreEvent extends IEventDto {
  organizerPictureUrl?: string
  organizerUsername: string
  organizerId: string
  description?: string
  capacity: number
  attendeesCount: number
}

const ExploreTemplate = () => {
  const { t } = useTranslation('common')
  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IExploreEvent>,
    IApiError
  >(
    ['events', 'explore'],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 4
      }
      const res = await api.post('/events/explore', {
        queryDocument
      })
      return res.data
    },
    {
      staleTime: 300_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  const getTrimmedName = (name: string) => {
    const maxChars = 30
    if (name.length > maxChars) return name.slice(0, maxChars - 2) + '...'
    return name
  }

  return (
    <Wrapper>
      <PageTitle>
        {t('explore')}
        <Explore />
      </PageTitle>

      <ExploreGrid>
        {pages.map(page =>
          page.entries.map(
            ({
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
            }) => {
              return (
                <CardWrapper key={id}>
                  <TopWrapper>
                    <Link href={`/events/${id}`}>
                      <BannerWrapper>
                        <img
                          className='banner'
                          src={bannerUrl || '/eventDetailBanner.png'}
                          alt='banner'
                        />
                      </BannerWrapper>
                    </Link>
                  </TopWrapper>

                  <BottomWrapper>
                    <Link href={`/events/${id}`}>
                      <StartDate className='start-date-avatar'>
                        <span>{new Date(startDate).getDate()}</span>
                        <ChevronRightRounded />
                      </StartDate>
                    </Link>

                    <h3>{getTrimmedName(name)}</h3>

                    <div className='event-info'>
                      <p>
                        <Person />
                        <Link href={`/users/${organizerId}`}>
                          <span className='username'>{organizerUsername}</span>
                        </Link>
                      </p>
                      <p>
                        <People />
                        {attendeesCount}/{capacity}
                      </p>
                      <p>
                        <Schedule />
                        {toLocalTime(startDate, 'DD MMMM yyyy')}
                      </p>
                      <p>
                        <LocationOn />
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
          )
        )}
      </ExploreGrid>

      <Observer disabled={isFetching || !hasNextPage} callback={fetchNextPage} />

      {isFetching && <CircularProgress />}
    </Wrapper>
  )
}

export default ExploreTemplate
