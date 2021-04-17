import { useQuery } from 'react-query'
import Link from 'next/link'
import { lowerFirst } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, CircularProgress } from '@material-ui/core'
import { AccountBox, EventAvailable, EventBusy, Public } from '@material-ui/icons'

import api from '@api/HttpClient'
import { IApiError } from '@api/types'
import { toLocalTime } from '@utils/utils'
import { Container } from '@elements/Container'
import useWindowSize from '@hooks/useWindowSize'
import { AccessibilityTypeEnum } from 'domainTypes'
import FetchError from '@elements/FetchError/FetchError'
import { useAuth } from '@contextProviders/AuthProvider'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'

import {
  StyledCard,
  BlurredImage,
  Wrapper,
  BannerImage,
  Title,
  EventDescription,
  InfoRow,
  Organizer
} from './EventDetailTemplate.styled'

interface IProps {
  eventId: string
}

interface IEventDetail {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  bannerUrl?: string
  accessibilityType: AccessibilityTypeEnum
  attendeesCount: number
  organizer: {
    id: string
    username: string
    pictureUrl?: string
  }
}

const EventDetailTemplate = ({ eventId }: IProps) => {
  const auth = useAuth()
  const { t } = useTranslation('common')
  const { width, height } = useWindowSize()
  const { data, isLoading, error, isIdle } = useQuery<IEventDetail, IApiError>(
    ['events', eventId],
    async () => await (await api.get(`/events/${eventId}`)).data,
    { enabled: !auth.isLoading }
  )

  if (isLoading || isIdle)
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  if (error) return <FetchError error={error} />

  const event = data!
  const banner = event.bannerUrl || '/eventDetailBanner.png'

  return (
    <Wrapper>
      <Box position='absolute' top={0} left={0} zIndex={-1}>
        <BlurredImage src={banner} width={width} height={height} />
      </Box>

      <Container>
        <BannerImage src={banner} />

        <StyledCard>
          <Title>{event.name}</Title>

          {event.description && (
            <CollapseContainer collapsedHeight={80}>
              <EventDescription>{event.description}</EventDescription>
            </CollapseContainer>
          )}

          <Box marginY='20px'>
            <InfoRow>
              <h6>
                <AccountBox />
                {t('organizer')}:
              </h6>
              <Link href={`/users/${event.organizer.id}`}>
                <Organizer>
                  <Avatar src={event.organizer.pictureUrl} />{' '}
                  <span>{event.organizer.username}</span>
                </Organizer>
              </Link>
            </InfoRow>
            <InfoRow>
              <h6>
                <EventAvailable />
                {t('startDate')}:
              </h6>
              <div>{toLocalTime(event.startDate)}</div>
            </InfoRow>
            <InfoRow>
              <h6>
                <EventBusy />
                {t('endDate')}:
              </h6>
              <div>{toLocalTime(event.endDate)}</div>
            </InfoRow>
            <InfoRow>
              <h6>
                <Public />
                {t('accessibility')}:
              </h6>
              <div>
                {t(
                  `enum.accessibilityTypeEnum.${lowerFirst(
                    AccessibilityTypeEnum[event.accessibilityType]
                  )}`
                )}
              </div>
            </InfoRow>
          </Box>
        </StyledCard>
      </Container>
    </Wrapper>
  )
}

export default EventDetailTemplate
