import { Translate } from 'next-translate'
import { QueryClient } from 'react-query'

import api from '@api/HttpClient'
import { apiErrorToast } from 'services/toastService'
import { FriendStatus, IUserDetail } from 'domainTypes'

export const acceptFriendRequest = async (
  friendId: string,
  t: Translate,
  queryClient: QueryClient
) => {
  try {
    await api.post(`/friends/confirm-request`, { friendId })

    const isFriendProfileLoaded = !!queryClient.getQueryData(['users', friendId])
    if (isFriendProfileLoaded) {
      queryClient.setQueryData<IUserDetail>(['users', friendId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.Friend,
        numberOfFriends: prev!.numberOfFriends + 1
      }))
    }
  } catch (err) {
    apiErrorToast(err, t)
  }
}

export const rejectFriendRequest = async (
  friendId: string,
  t: Translate,
  queryClient: QueryClient
) => {
  try {
    await api.post(`/friends/reject-request`, { friendId })

    const isFriendProfileLoaded = !!queryClient.getQueryData(['users', friendId])
    if (isFriendProfileLoaded) {
      queryClient.setQueryData<IUserDetail>(['users', friendId], prev => ({
        ...prev!,
        friendStatus: FriendStatus.None
      }))
    }
  } catch (err) {
    apiErrorToast(err, t)
  }
}
