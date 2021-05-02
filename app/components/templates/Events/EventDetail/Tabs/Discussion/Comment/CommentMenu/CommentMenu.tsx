import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Box, Menu, MenuItem } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { Delete, Edit, MoreVert } from '@material-ui/icons'

import api from '@api/HttpClient'
import { IComment } from '../../Discussion'
import { apiErrorToast } from 'services/toastService'
import { increaseReplyCount, removeComment } from '../../utils'

import { IconWrapper } from './CommentMenu.styled'

interface ICommentMenuProps {
  eventId: string
  comment: IComment
  onEdit: () => void
  getCommentsQueryKey: (parentId?: string | null) => any[]
}

const CommentMenu = ({ eventId, comment, getCommentsQueryKey, onEdit }: ICommentMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement>()
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()

  const handleDeleted = async () => {
    try {
      await api.delete(`/events/${eventId}/comments/${comment.id}`)
      removeComment(queryClient, getCommentsQueryKey(comment.parentId), comment)

      if (comment.parentId)
        increaseReplyCount(queryClient, getCommentsQueryKey(), comment.parentId, -1)
    } catch (err) {
      apiErrorToast(err, t)
    }
  }

  return (
    <>
      <IconWrapper onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconWrapper>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(undefined)}
      >
        <MenuItem onClick={handleDeleted}>
          <Box marginRight='8px' color='themeText.themeGray'>
            <Delete fontSize='small' />
          </Box>
          {t('delete')}
        </MenuItem>

        <MenuItem onClick={onEdit}>
          <Box marginRight='8px' color='themeText.themeGray'>
            <Edit fontSize='small' />
          </Box>
          {t('edit')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default CommentMenu
