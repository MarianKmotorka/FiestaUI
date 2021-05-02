import { memo, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import { Box, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  CheckCircleOutline,
  Edit
} from '@material-ui/icons'

import api from '@api/HttpClient'
import { IComment } from '../Discussion'
import Button from '@elements/Button/Button'
import NewComment from '../NewComment/NewComment'
import CommentMenu from './CommentMenu/CommentMenu'
import FetchError from '@elements/FetchError/FetchError'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'

import {
  Content,
  CreatedAt,
  ReplyButton,
  StyledChip,
  UserName,
  ViewRepliesButton
} from './Comment.styled'
import { StyledAvatar } from '../Discussion.styled'

interface ICommentProps {
  comment: IComment
  organizerId: string
  eventId: string
  getCommentsQueryKey: (parentId?: string | null) => any[]
  onReply: (text: string, parentId: string) => Promise<void>
}

const Comment = memo(
  ({ comment, eventId, organizerId, getCommentsQueryKey, onReply }: ICommentProps) => {
    const { t } = useTranslation('common')
    const { currentUser } = useAuthorizedUser()
    const [showNewReply, setShowNewReply] = useState(false)
    const [showReplies, setShowReplies] = useState(false)

    const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
      ISkippedItemsResponse<IComment>,
      IApiError
    >(
      getCommentsQueryKey(comment.id),
      async ({ pageParam = 0 }) => {
        const skippedItemsDocument: ISkippedItemsDocument = {
          skip: pageParam,
          take: 10
        }
        const res = await api.post(`/events/${eventId}/comments/query`, {
          skippedItemsDocument,
          parentId: comment.id
        })
        return res.data
      },
      {
        staleTime: 60_000,
        keepPreviousData: true,
        enabled: showReplies,
        getNextPageParam: (lastPage, allPages) =>
          !lastPage || lastPage.hasMore ? allPages.flatMap(x => x.entries).length : false
      }
    )

    if (error) return <FetchError error={error} />

    const userHref = `/users/${comment.sender.id}`
    const username =
      organizerId === comment.sender.id ? (
        <StyledChip label={comment.sender.username} icon={<CheckCircleOutline />} />
      ) : (
        <UserName>{comment.sender.username}</UserName>
      )

    const handleReply = async (text: string) => {
      await onReply(text, comment.id)
    }

    return (
      <Box marginY='20px'>
        <Box display='flex'>
          <Link href={userHref}>
            <Box width={comment.parentId ? '40px' : '50px'}>
              <StyledAvatar src={comment.sender.pictureUrl} small={comment.parentId ? 1 : 0} />
            </Box>
          </Link>

          <Box flex='1'>
            <Box display='flex' alignItems='center' gridGap='5px'>
              <Link href={userHref}>{username}</Link>
              <CreatedAt>{moment.utc(comment.createdAt).local().fromNow()}</CreatedAt>
              {comment.isEdited && (
                <Box>
                  <Edit fontSize='inherit' color='disabled' />
                </Box>
              )}
            </Box>

            <Content>{comment.text}</Content>

            {!comment.parentId && (
              <ReplyButton variant='text' color='default' onClick={() => setShowNewReply(true)}>
                {t('reply').toUpperCase()}
              </ReplyButton>
            )}
          </Box>

          {currentUser.id === comment.sender.id && (
            <CommentMenu
              getCommentsQueryKey={getCommentsQueryKey}
              eventId={eventId}
              comment={comment}
            />
          )}
        </Box>

        <Box marginLeft='50px'>
          {showNewReply && (
            <NewComment onCancel={() => setShowNewReply(false)} onSend={handleReply} isReply />
          )}

          {comment.replyCount > 0 && (
            <ViewRepliesButton
              variant='text'
              disableRipple
              startIcon={showReplies ? <ArrowDropUp /> : <ArrowDropDown />}
              onClick={() => setShowReplies(x => !x)}
            >
              {showReplies
                ? t('hideCountReplies', { count: comment.replyCount })
                : t('viewCountReplies', { count: comment.replyCount })}
            </ViewRepliesButton>
          )}

          {showReplies &&
            !isLoading &&
            data!.pages.map(page =>
              page.entries.map(e => (
                <Comment
                  getCommentsQueryKey={getCommentsQueryKey}
                  onReply={onReply}
                  eventId={eventId}
                  organizerId={organizerId}
                  key={e.id}
                  comment={e}
                />
              ))
            )}

          {(isLoading || isFetching) && (
            <Box>
              <CircularProgress />
            </Box>
          )}

          {hasNextPage && showReplies && !isLoading && !isFetching && (
            <Button variant='text' startIcon={<ArrowDownward />} onClick={() => fetchNextPage()}>
              {t('loadMore')}
            </Button>
          )}
        </Box>
      </Box>
    )
  }
)

export default Comment
