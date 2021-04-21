import { Box } from '@material-ui/core'
import { IUserDto } from 'domainTypes'
import Link from 'next/link'
import { ItemSubText, ItemText, StyledAvatar, Wrapper } from './UserListItem.styled'

interface IUserListItemProps {
  user: IUserDto
  href?: string
  className?: string
}

const UserListItem = ({ user, href, className }: IUserListItemProps) => {
  return (
    <Link href={href || `/users/${user.id}`}>
      <Wrapper className={className}>
        <StyledAvatar src={user.pictureUrl} />

        <Box>
          <ItemText>{user.username}</ItemText>
          <ItemSubText>{user.fullName}</ItemSubText>
        </Box>
      </Wrapper>
    </Link>
  )
}

export default UserListItem
