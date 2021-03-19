import { useQuery } from 'react-query'
import { Avatar, Box } from '@material-ui/core'

import api from '@api/HttpClient'
import { IApiError } from 'types'
import { IUser } from 'domainTypes'
import Spinner from '@elements/Spinner'
import Divider from '@elements/Divider'
import FetchError from '@elements/FetchError/FetchError'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'

import { AvatarAndNameWrapper } from './UserDetailTemplate.styled'

interface IUserDetailTemplateProps {
  userId: string
}

const UserDetailTemplate = ({ userId }: IUserDetailTemplateProps) => {
  const { data, error, isLoading } = useQuery<IUser, IApiError>(
    ['users', userId],
    async () => (await api.get(`/users/${userId}`)).data
  )

  if (isLoading) return <Spinner themed />
  if (error) return <FetchError error={error} />

  const user = data!

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <AvatarAndNameWrapper>
          <Avatar src={user.pictureUrl} />
          <h1>{user.username}</h1>
          <p>{user.fullName}</p>
        </AvatarAndNameWrapper>
      </Box>

      <Box margin='30px auto'>
        <Divider />
      </Box>

      {user.bio && (
        <Box maxWidth='min(100%, 700px)' marginX='auto'>
          <CollapseContainer>
            <Box whiteSpace='pre-wrap' color='themeText.themeBlack'>
              {user.bio}
            </Box>
          </CollapseContainer>
        </Box>
      )}
    </>
  )
}

export default UserDetailTemplate
