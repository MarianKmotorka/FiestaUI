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
  const queryKey = ['event', event.id, 'comments', 'query']

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    ISkippedItemsResponse<IComment>,
    IApiError
  >(
    queryKey,
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

  const submitComment = async (text: string, parentId?: string) => {
    try {
      var response = await api.post<IComment>(`/events/${event.id}/comments`, { text, parentId })
      var newComment = response.data
      queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
        ...prev!,
        pages: prev!.pages.map((page, pageIndex) => ({
          ...page,
          entries: pageIndex === 0 ? [newComment, ...page.entries] : page.entries
        }))
      }))
    } catch (err) {
      errorToast(getErrorMessage(err, t))
    }
  }

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
            isOrganizerComment={x.sender.id === event.organizer.id}
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
