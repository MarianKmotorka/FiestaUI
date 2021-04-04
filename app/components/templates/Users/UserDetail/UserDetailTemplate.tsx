import Link from 'next/link'
import { useQuery, useQueryClient } from 'react-query'
import { Edit, Message, PersonAdd } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, CircularProgress } from '@material-ui/core'
import { useState } from 'react'

import { errorToast, successToast } from 'services/toastService'
import api from '@api/HttpClient'
import { FriendStatus, IUser } from 'domainTypes'
import { IApiError } from '@api/types'
import Divider from '@elements/Divider'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
import FetchError from '@elements/FetchError/FetchError'
import { isSignedInLocalStorageFlagSet, useAuth } from '@contextProviders/AuthProvider'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'
import FriendMenu from './FriendMenu/FriendMenu'

import { friendStatusTextMap, friendStatusStartIconMap, friendStatusEndIconMap } from './utils'
import {
  AvatarWrapper,
  BioText,
  ButtonsWrapper,
  NameAndButtonsAndBioWrapper,
  NameAndButtonsWrapper,
  NameWrapper,
  TopSection
} from './UserDetailTemplate.styled'

interface IUserDetailTemplateProps {
  userId: string
}

const UserDetailTemplate = ({ userId }: IUserDetailTemplateProps) => {
  const auth = useAuth()
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  const [friendEl, setFriendEl] = useState<HTMLElement>()
  const [friendStatusLoading, setFriendStatusLoading] = useState(false)

  const { data, error, isLoading, isIdle } = useQuery<IUser, IApiError>(
    ['users', userId],
    async () => (await api.get(`/users/${userId}`)).data,
    { enabled: auth.isLoggedIn || !isSignedInLocalStorageFlagSet() }
  )

  if (isLoading || isIdle) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const isCurrUser = auth.isLoggedIn ? auth.currentUser.id === userId : false
  const user = data!

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
      <TopSection>
        <AvatarWrapper>
          <Avatar src={user.pictureUrl} />
        </AvatarWrapper>

        <NameAndButtonsAndBioWrapper>
          <NameAndButtonsWrapper>
            <NameWrapper>
              <h1>{user.username}</h1>
              <p>{user.fullName}</p>
            </NameWrapper>

            <ButtonsWrapper>
              {isCurrUser && (
                <Link href='/settings?tab=editProfile'>
                  <Button variant='outlined' color='secondary' endIcon={<Edit />}>
                    {t('edit')}
                  </Button>
                </Link>
              )}

              {!isCurrUser && (
                <Button variant='outlined' color='secondary' endIcon={<Message />}>
                  {t('message')}
                </Button>
              )}

              {!isCurrUser && (
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
                    color={
                      user.friendStatus === FriendStatus.FriendRequestRecieved
                        ? 'primary'
                        : 'secondary'
                    }
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
              )}
            </ButtonsWrapper>
          </NameAndButtonsWrapper>

          {user.bio && (
            <Box marginTop='20px'>
              <CollapseContainer>
                <BioText>{user.bio}</BioText>
              </CollapseContainer>
            </Box>
          )}
        </NameAndButtonsAndBioWrapper>
      </TopSection>

      <Box margin='30px auto'>
        <Divider />
      </Box>

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

export default UserDetailTemplate
