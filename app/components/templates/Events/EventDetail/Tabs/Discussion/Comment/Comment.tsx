import { Box, Chip, Typography } from '@material-ui/core'
import { ArrowDropDown, ArrowDropUp, CheckCircleOutline } from '@material-ui/icons'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useState } from 'react'
import { IComment } from '../Discussion'
import { StyledAvatar } from '../Discussion.styled'
import { CreatedAt, StyledChip, UserName, ViewRepliesButton } from './Comment.styled'

interface ICommentProps {
  comment: IComment
  isOrganizerComment: boolean
}

const Comment = ({ comment, isOrganizerComment }: ICommentProps) => {
  const { t } = useTranslation('common')
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
        <StyledAvatar src={comment.sender.pictureUrl} />
      </Link>

      <Box>
        <Box display='flex' alignItems='flex-end' gridGap='5px'>
          <Link href={userHref}>{username}</Link>
          <CreatedAt>{moment.utc(comment.createdAt).local().fromNow()}</CreatedAt>
        </Box>

        <Typography variant='body1'>{comment.text}</Typography>

        {comment.replyCount > 0 && (
          <ViewRepliesButton
            variant='text'
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
