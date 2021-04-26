import { useCallback } from 'react'
import { CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'

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
  parentId?: string
}

const Discussion = ({ event }: IDiscussionProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const getQueryKey = useCallback(
    (parentId?: string) => ['event', event.id, 'comments', 'query', { parentId }],
    [event.id]
  )

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    ISkippedItemsResponse<IComment>,
    IApiError
  >(
    getQueryKey(),
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
    async (text: string, parentId?: string) => {
      try {
        var response = await api.post<IComment>(`/events/${event.id}/comments`, { text, parentId })
        var newComment = response.data

        // Add new comment to the top
        queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(
          getQueryKey(parentId),
          prev =>
            prev
              ? {
                  ...prev,
                  pages: prev.pages.map((page, pageIndex) => ({
                    ...page,
                    entries: pageIndex === 0 ? [newComment, ...page.entries] : page.entries
                  }))
                }
              : { pages: [], pageParams: [] }
        )

        if (parentId) {
          // Increment replyCount for parent comment
          queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(
            getQueryKey(),
            prev => ({
              ...prev!,
              pages: prev!.pages.map((page, pageIndex) => ({
                ...page,
                entries: page.entries.map(e =>
                  e.id === parentId ? { ...e, replyCount: e.replyCount + 1 } : e
                )
              }))
            })
          )
          // Invalidate chache so it refetches when viewed
          queryClient.invalidateQueries(getQueryKey(parentId), { refetchActive: false })
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
