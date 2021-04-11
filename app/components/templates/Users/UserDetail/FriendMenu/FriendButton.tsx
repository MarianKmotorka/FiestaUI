import { useState } from 'react'
import Link from 'next/link'
import { useQueryClient } from 'react-query'
import { PersonAdd } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import FriendMenu from './FriendMenu'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
import { FriendStatus, IUser } from 'domainTypes'
import { errorToast, successToast } from 'services/toastService'

import { friendStatusEndIconMap, friendStatusStartIconMap, friendStatusTextMap } from './utils'

interface IProps {
  user: IUser
}

const FriendButton = ({ user }: IProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const [friendEl, setFriendEl] = useState<HTMLElement>()
  const [friendStatusLoading, setFriendStatusLoading] = useState(false)

  const handleAddFriendClick = async () => {
    try {
      setFriendStatusLoading(true)
      await api.post(`/friends/send-request`, { friendId: user.id })
      queryClient.setQueryData<IUser>(['users', user.id], prev => ({
        ...prev!,
        friendStatus: FriendStatus.FriendRequestSent
      }))
      successToast(t('requestSent'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setFriendStatusLoading(false)
  }

  return (
    <>
      <AuthCheck
        fallback={loginUrl => (
          <Link href={loginUrl}>
            <Button variant='outlined' color='secondary' endIcon={<PersonAdd />}>
              {t('addFriend')}
            </Button>
          </Link>
        )}
      >
        <Button
          variant='outlined'
          loading={friendStatusLoading}
          color={user.friendStatus === FriendStatus.FriendRequestRecieved ? 'primary' : 'secondary'}
          startIcon={friendStatusStartIconMap[user.friendStatus]}
          endIcon={friendStatusEndIconMap[user.friendStatus]}
          onClick={e =>
            user.friendStatus === FriendStatus.None
              ? handleAddFriendClick()
              : setFriendEl(friendEl ? undefined : e.currentTarget)
          }
        >
          {t(friendStatusTextMap[user.friendStatus])}
        </Button>
      </AuthCheck>

      <FriendMenu
        userId={user.id}
        friendStatus={user.friendStatus}
        onClose={() => setFriendEl(undefined)}
        anchorEl={friendEl}
        setLoading={setFriendStatusLoading}
      />
    </>
  )
}

export default FriendButton
