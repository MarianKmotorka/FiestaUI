import Link from 'next/link'
import { useQuery } from 'react-query'
import { Edit, Message } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, CircularProgress } from '@material-ui/core'

import api from '@api/HttpClient'
import { IUserDetail } from 'domainTypes'
import { IApiError } from '@api/types'
import Divider from '@elements/Divider'
import Button from '@elements/Button/Button'
import FriendButton from './FriendMenu/FriendButton'
import FetchError from '@elements/FetchError/FetchError'
import { useAuth } from '@contextProviders/AuthProvider'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'

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
  const { t } = useTranslation('common')

  const { data, error, isLoading, isIdle } = useQuery<IUserDetail, IApiError>(
    ['users', userId],
    async () => (await api.get(`/users/${userId}`)).data,
    { enabled: !auth.isLoading }
  )

  if (isLoading || isIdle) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const isCurrUser = auth.isLoggedIn ? auth.currentUser.id === userId : false
  const user = data!

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

              {!isCurrUser && <FriendButton user={user} />}
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
    </>
  )
}

export default UserDetailTemplate
