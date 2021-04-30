import { useCallback } from 'react'
import { CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useInfiniteQuery, useQueryClient } from 'react-query'

import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import Comment from './Comment/Comment'
import Observer from '@elements/Observer'
import { getErrorMessage } from '@utils/utils'
import NewComment from './NewComment/NewComment'
import { errorToast } from 'services/toastService'
import FetchError from '@elements/FetchError/FetchError'
import { IEventDetail } from '../../EventDetailTemplate'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'

import { addComment, increaseReplyCount } from './utils'

interface IDiscussionProps {
  event: IEventDetail
}

export interface IComment {
  id: string
  text: string
  createdAt: string
  replyCount: number
  sender: IUserDto
  isEdited: boolean
  parentId: string | null // keep null instead of undefined because BE returns null a parentId is used in queryKey
}

const Discussion = ({ event }: IDiscussionProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const getQueryKey = useCallback(
    (parentId: string | null = null) => ['event', event.id, 'comments', 'query', { parentId }],
    [event.id]
  )

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    ISkippedItemsResponse<IComment>,
    IApiError
  >(
    getQueryKey(null),
    async ({ pageParam = 0 }) => {
      const skippedItemsDocument: ISkippedItemsDocument = {
        skip: pageParam
      }
      const res = await api.post(`/events/${event.id}/comments/query`, {
        skippedItemsDocument
      })
      return res.data
    },
    {
      staleTime: 60_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore }, allPages) =>
        hasMore ? allPages.flatMap(x => x.entries).length : false
    }
  )

  const submitComment = useCallback(
    async (text: string, parentId: string | null = null) => {
      try {
        const { data } = await api.post<IComment>(`/events/${event.id}/comments`, {
          text,
          parentId
        })
        addComment(queryClient, getQueryKey(parentId), data)

        if (parentId) {
          // Invalidate cache so it refetches replies when viewed
          queryClient.invalidateQueries(getQueryKey(parentId), { refetchActive: false })
          increaseReplyCount(queryClient, getQueryKey(), parentId)
        }
      } catch (err) {
        errorToast(getErrorMessage(err, t))
      }
    },
    [event.id, queryClient, t, getQueryKey]
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      <NewComment onSend={submitComment} />

      {pages.map(page =>
        page.entries.map(x => (
          <Comment
            key={x.id}
            comment={x}
            eventId={event.id}
            organizerId={event.organizer.id}
            getQueryKey={getQueryKey}
            onReply={submitComment}
          />
        ))
      )}

      {isFetching && <CircularProgress />}

      <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
    </>
  )
}

export default Discussion
