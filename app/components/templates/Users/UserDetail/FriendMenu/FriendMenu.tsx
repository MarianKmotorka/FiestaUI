import { useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { Block, Cancel, CancelScheduleSend, Check } from '@material-ui/icons'

import api from '@api/HttpClient'
import { Menu } from '@elements/Menu/Menu'
import { FriendStatus, IUserDetail } from 'domainTypes'
import { errorToast, successToast } from 'services/toastService'

import { StyledMenuItem } from './FriendMenu.styled'

interface IFriendMenuProps {
  userId: string
  friendStatus: FriendStatus
  anchorEl?: HTMLElement
  setLoading: (loading: boolean) => void
  onClose: () => void
}

const FriendMenu = ({ anchorEl, onClose, setLoading, userId, friendStatus }: IFriendMenuProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()

  const handleRemoveFriendClicked = async () => {
    try {
      setLoading(true)
      onClose()
      await api.delete(`/friends/${userId}`)
      queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.None
      }))
      successToast(t('friendRemoved'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleUnsendFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/unsend-request`, { friendId: userId })
      queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.None
      }))
      successToast(t('requestUnsent'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleAcceptFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/confirm-request`, { friendId: userId })
      queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.Friend
      }))
      successToast(t('requestAccepted'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleRejectFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/reject-request`, { friendId: userId })
      queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.None
      }))
      successToast(t('requestRejected'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  return (
    <Menu elevation={4} keepMounted open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      {friendStatus == FriendStatus.Friend && (
        <StyledMenuItem id='removeMenuItem' onClick={handleRemoveFriendClicked}>
          <Cancel />
          {t('removeFriend')}
        </StyledMenuItem>
      )}

      {friendStatus == FriendStatus.FriendRequestSent && (
        <StyledMenuItem id='removeMenuItem' onClick={handleUnsendFriendRequestClick}>
          <CancelScheduleSend />
          {t('unsendFriendRequest')}
        </StyledMenuItem>
      )}

      {friendStatus == FriendStatus.FriendRequestRecieved && (
        <>
          <StyledMenuItem onClick={handleAcceptFriendRequestClick}>
            <Check />
            {t('acceptFriendRequest')}
          </StyledMenuItem>

          <StyledMenuItem id='removeMenuItem' onClick={handleRejectFriendRequestClick}>
            <Block />
            {t('rejectFriendRequest')}
          </StyledMenuItem>
        </>
      )}
    </Menu>
  )
}

export default FriendMenu
