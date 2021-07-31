import { useEffect, useState } from 'react'
import Link from 'next/link'
import { lowerFirst } from 'lodash'
import { useQuery, useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { Box, Button as MuiButton, CircularProgress } from '@material-ui/core'
import {
  AccountBox,
  DeleteTwoTone,
  EditTwoTone,
  EventAvailable,
  EventBusy,
  EventNoteTwoTone,
  FormatListNumbered,
  LockOpen,
  OpenInNew,
  PersonAddDisabledOutlined,
  PersonAddOutlined,
  Public
} from '@material-ui/icons'

import api from '@api/HttpClient'
import Banner from './Banner/Banner'
import { IApiError } from '@api/types'
import Divider from '@elements/Divider'
import Linkify from '@elements/Linkify'
import { toLocalTime } from '@utils/utils'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
import { getGoogleCalendarUrl } from './utils'
import { Container } from '@elements/Container'
import useWindowSize from '@hooks/useWindowSize'
import DeleteEventDialog from './DeleteEventDialog'
import { AccessibilityTypeEnum } from 'domainTypes'
import EventDetailTabs from './Tabs/EventDetailTabs'
import FetchError from '@elements/FetchError/FetchError'
import { useAuth } from '@contextProviders/AuthProvider'
import InvitationPopup from './InvitationPopup/InvitationPopup'
import { apiErrorToast, successToast } from 'services/toastService'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

import {
  StyledCard,
  BlurredImage,
  Wrapper,
  Title,
  EventDescription,
  InfoRow,
  Organizer,
  BlurredImageWrapper
} from './EventDetailTemplate.styled'

interface IProps {
  eventId: string
}

export interface IEventDetail {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  bannerUrl?: string
  googleMapsUrl: string
  location: string
  accessibilityType: AccessibilityTypeEnum
  attendeesCount: number
  invitationsCount: number
  isCurrentUserInvited: boolean
  isCurrentUserAttendee: boolean
  isJoinRequestSentByCurrentUser: boolean
  capacity: number
  organizer: {
    id: string
    username: string
    pictureUrl?: string
  }
}

const EventDetailTemplate = ({ eventId }: IProps) => {
  const auth = useAuth()
  const { t } = useTranslation('common')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { width, height, minMedium, maxMedium } = useWindowSize()
  const { data, isLoading, error, isIdle } = useQuery<IEventDetail, IApiError>(
    ['events', eventId],
    async () => await (await api.get(`/events/${eventId}`)).data,
    { enabled: !auth.isLoading }
  )
  const [isJoinRequestLoading, setIsJoinRequestLoading] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    //Invalidate cached tabs
    queryClient.invalidateQueries(['events', eventId, 'attendees', 'query'])
    queryClient.invalidateQueries(['events', eventId, 'invitations', 'query'])
    queryClient.invalidateQueries(['events', eventId, 'joinRequests', 'query'])
    queryClient.invalidateQueries(['events', eventId, 'comments', 'query'])
  }, [eventId, queryClient])

  if (isLoading || isIdle)
    return (
      <Container>
        <Box marginTop={`${NAVBAR_HEIGHT}px`}>
          <CircularProgress />
        </Box>
      </Container>
    )
  if (error) return <FetchError error={error} />

  const event = data!
  const bannerUrl = event.bannerUrl || '/eventDetailBanner.png'
  const isOrganizer = auth.isLoggedIn && auth.currentUser.id === event.organizer.id

  const handleSendRequestClick = async () => {
    try {
      setIsJoinRequestLoading(true)
      await api.post(`/events/${event.id}/join-requests`, { id: event.id })
      queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
        ...prev!,
        isJoinRequestSentByCurrentUser: true
      }))
      successToast(t('requestSent'))
    } catch (err) {
      apiErrorToast(err, t)
    }
    setIsJoinRequestLoading(false)
  }

  const handleUnsendRequestClick = async () => {
    try {
      setIsJoinRequestLoading(true)
      await api.post(`/events/${event.id}/join-requests/delete`, { id: event.id })
      queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
        ...prev!,
        isJoinRequestSentByCurrentUser: false
      }))
      successToast(t('requestUnsent'))
    } catch (err) {
      apiErrorToast(err, t)
    }
    setIsJoinRequestLoading(false)
  }

  return (
    <Wrapper>
      <BlurredImageWrapper>
        <BlurredImage src={bannerUrl} width={width} height={height} />
      </BlurredImageWrapper>

      <Container disabled={maxMedium}>
        <Banner src={bannerUrl} eventId={eventId} canUpload={isOrganizer} />

        <StyledCard>
          <Container disabled={minMedium}>
            <Title>{event.name}</Title>

            {event.description && (
              <CollapseContainer collapsedHeight={80}>
                <EventDescription>
                  <Linkify>{event.description}</Linkify>
                </EventDescription>
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
                  <LockOpen />
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
              <InfoRow>
                <h6>
                  <Public />
                  {t('location')}:
                </h6>
                <div>
                  <MuiButton
                    target='_blank'
                    rel='noopener noreferrer'
                    href={event.googleMapsUrl}
                    endIcon={<OpenInNew />}
                  >
                    {event.location}
                  </MuiButton>
                </div>
              </InfoRow>
              <InfoRow>
                <h6>
                  <FormatListNumbered />
                  {t('maxAttendees')}:
                </h6>
                <div>{event.capacity}</div>
              </InfoRow>
            </Box>

            <Divider />

            <Box
              display='flex'
              justifyContent='flex-end'
              gridGap='10px'
              flexWrap='wrap'
              marginTop='15px'
            >
              {(event.isCurrentUserAttendee || isOrganizer) && (
                <MuiButton
                  startIcon={<EventNoteTwoTone />}
                  color='default'
                  variant='text'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={getGoogleCalendarUrl(event)}
                >
                  {t('addToGoogleCalendar')}
                </MuiButton>
              )}

              {isOrganizer && (
                <>
                  <Link href={`/events/${eventId}/update`}>
                    <Button startIcon={<EditTwoTone />} color='default' variant='text'>
                      {t('edit')}
                    </Button>
                  </Link>

                  <Button
                    variant='text'
                    startIcon={<DeleteTwoTone />}
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    {t('delete')}
                  </Button>
                </>
              )}

              {!isOrganizer && !event.isCurrentUserAttendee && !event.isCurrentUserInvited && (
                <AuthCheck
                  fallback={loginUrl => (
                    <Link href={loginUrl}>
                      <Button endIcon={<PersonAddOutlined />}>{t('sendJoinRequest')}</Button>
                    </Link>
                  )}
                >
                  <Button
                    loading={isJoinRequestLoading}
                    variant={event.isJoinRequestSentByCurrentUser ? 'text' : 'contained'}
                    startIcon={
                      event.isJoinRequestSentByCurrentUser ? (
                        <PersonAddDisabledOutlined />
                      ) : (
                        <PersonAddOutlined />
                      )
                    }
                    onClick={
                      event.isJoinRequestSentByCurrentUser
                        ? handleUnsendRequestClick
                        : handleSendRequestClick
                    }
                  >
                    {t(
                      event.isJoinRequestSentByCurrentUser ? 'unsendJoinRequest' : 'sendJoinRequest'
                    )}
                  </Button>
                </AuthCheck>
              )}
            </Box>
          </Container>
        </StyledCard>
      </Container>

      <Container>
        <EventDetailTabs event={event} isOrganizer={isOrganizer} />
      </Container>

      {showDeleteDialog && (
        <DeleteEventDialog onClose={() => setShowDeleteDialog(false)} eventId={event.id} />
      )}

      {event.isCurrentUserInvited && <InvitationPopup event={event} />}
    </Wrapper>
  )
}

export default EventDetailTemplate
