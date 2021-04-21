import { isEmpty } from 'lodash'
import { useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'

import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import Observer from '@elements/Observer'
import Button from '@elements/Button/Button'
import useDebounce from '@hooks/useDebounce'
import { getErrorMessage } from '@utils/utils'
import FetchError from '@elements/FetchError/FetchError'
import { IEventDetail } from '../../EventDetailTemplate'
import useTranslation from 'next-translate/useTranslation'
import UserListItem from '@elements/UserListItem/UserListItem'
import { errorToast, successToast } from 'services/toastService'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'

import { ActionsWrapper, Item, ItemsContainer, StyledTextBox } from '../common.styled'

interface IInvitationsProps {
  event: IEventDetail
  isOrganizer: boolean
}

interface IInvitation {
  invitee: IUserDto
  inviter: IUserDto
  createdAtUtc: string
}

const Invitations = ({ event }: IInvitationsProps) => {
  const [deletingId, setDeletingId] = useState<string>()
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const queryKey = ['events', event.id, 'invitations', 'query', debouncedSearch]

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IInvitation>,
    IApiError
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 25
      }
      const res = await api.post(
        `/events/${event.id}/invitations/query?search=${debouncedSearch}`,
        {
          queryDocument
        }
      )
      return res.data
    },
    {
      staleTime: 60_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  const handleDeleted = async (userId: string) => {
    setDeletingId(userId)
    try {
      await api.post(`/events/${event.id}/invitations/delete`, { removeUserIds: [userId] })
      queryClient.invalidateQueries(['events', event.id, 'invitations', 'query'])
      queryClient.setQueryData<InfiniteData<IQueryResponse<IInvitation>>>(queryKey, prev => ({
        ...prev!,
        pages: prev!.pages.map(page => ({
          ...page,
          entries: page.entries.filter(e => e.invitee.id !== userId)
        }))
      }))
      queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
        ...prev!,
        invitationsCount: prev!.invitationsCount - 1
      }))
      successToast(t('success'))
    } catch (err) {
      errorToast(getErrorMessage(err, t))
    }
    setDeletingId(undefined)
  }

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      <Box marginY='20px' color='themeText.themeGray'>
        {t('thisEventHasCountInvitations', { count: event.invitationsCount })}
      </Box>

      <StyledTextBox
        value={search}
        label={t('search')}
        onChange={setSearch}
        variant='outlined'
        size='small'
      />

      {isFetching && (
        <Box marginY='15px'>
          <CircularProgress />
        </Box>
      )}

      {!isFetching && isEmpty(pages.flatMap(x => x.entries)) && (
        <Box marginTop='20px'>{t('nothingFound')}</Box>
      )}

      <ItemsContainer>
        {pages.map(page =>
          page.entries.map(e => (
            <Item key={e.invitee.id}>
              <UserListItem user={e.invitee} />

              <ActionsWrapper>
                <Button
                  variant='text'
                  onClick={() => handleDeleted(e.invitee.id)}
                  loading={e.invitee.id === deletingId}
                >
                  {t('delete')}
                </Button>
              </ActionsWrapper>
            </Item>
          ))
        )}

        <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
      </ItemsContainer>
    </>
  )
}

export default Invitations
