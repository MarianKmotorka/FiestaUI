import Link from 'next/link'
import { useQuery } from 'react-query'
import { Edit, GroupAdd, Send } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, CircularProgress } from '@material-ui/core'

import api from '@api/HttpClient'
import { IUser } from 'domainTypes'
import { IApiError } from '@api/types'
import Divider from '@elements/Divider'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
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
  const { data, error, isLoading } = useQuery<IUser, IApiError>(
    ['users', userId],
    async () => (await api.get(`/users/${userId}`)).data
  )

  if (isLoading) return <CircularProgress />
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
                <Button variant='outlined' color='secondary' endIcon={<Send />}>
                  {t('message')}
                </Button>
              )}

              {!isCurrUser && (
                <AuthCheck
                  fallback={loginUrl => (
                    <Link href={loginUrl}>
                      <Button variant='outlined' color='secondary' endIcon={<GroupAdd />}>
                        {t('addFriend')}
                      </Button>
                    </Link>
                  )}
                >
                  <Button variant='outlined' color='secondary' endIcon={<GroupAdd />}>
                    {t('addFriend')}
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
    </>
  )
}

export default UserDetailTemplate
