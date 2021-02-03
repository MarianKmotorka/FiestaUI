import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import styled from 'styled-components'

const StyledPre = styled.pre`
  background-color: ${({ theme }) => theme.bg[100]};
  color: ${({ theme }) => theme.themeText.themeBlack};
  padding: 50px;
  margin: 50px;
  border-radius: 8px;
  font-size: 1.5rem;
  overflow: auto;
`

const UserProfile = () => {
  const { currentUser } = useAuthorizedUser()

  return <StyledPre>{JSON.stringify(currentUser, null, 2)}</StyledPre>
}

export default UserProfile
