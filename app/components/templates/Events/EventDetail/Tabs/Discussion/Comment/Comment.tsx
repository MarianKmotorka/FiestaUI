import { useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { ArrowDropDown, ArrowDropUp, CheckCircleOutline } from '@material-ui/icons'

import { IComment } from '../Discussion'
import Button from '@elements/Button/Button'
import NewComment from '../NewComment/NewComment'

import { StyledAvatar } from '../Discussion.styled'
import { Content, CreatedAt, StyledChip, UserName, ViewRepliesButton } from './Comment.styled'

interface ICommentProps {
  comment: IComment
  isOrganizerComment: boolean
}

const Comment = ({ comment, isOrganizerComment }: ICommentProps) => {
  const { t } = useTranslation('common')
  const [showNewReply, setShowNewReply] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const userHref = `/users/${comment.sender.id}`

  const username = isOrganizerComment ? (
    <StyledChip label={comment.sender.username} icon={<CheckCircleOutline />} />
  ) : (
    <UserName>{comment.sender.username}</UserName>
  )

  return (
    <Box display='flex' gridGap='15px' marginY='25px'>
      <Link href={userHref}>
        <StyledAvatar src={comment.sender.pictureUrl} small={!!comment.parentId} />
      </Link>

      <Box flex='1'>
        <Box display='flex' alignItems='flex-end' gridGap='5px'>
          <Link href={userHref}>{username}</Link>
          <CreatedAt>{moment.utc(comment.createdAt).local().fromNow()}</CreatedAt>
        </Box>

        <Content>{comment.text}</Content>

        <Button variant='text' color='default' onClick={() => setShowNewReply(true)}>
          {t('reply').toUpperCase()}
        </Button>

        {showNewReply && (
          <NewComment onCancel={() => setShowNewReply(false)} onSend={async text => {}} isReply />
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
      </Box>
    </Box>
  )
}

export default Comment
