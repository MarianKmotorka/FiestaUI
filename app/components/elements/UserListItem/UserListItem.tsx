import { Box } from '@material-ui/core'
import { IUserDto } from 'domainTypes'
import Link from 'next/link'
import { ItemSubText, ItemText, StyledAvatar, Wrapper } from './UserListItem.styled'

interface IUserListItemProps {
  user: IUserDto
  href?: string
  className?: string
  isLink?: boolean
}

const UserListItem = ({ user, isLink, href, className }: IUserListItemProps) => {
  const content = (
    <Wrapper className={className} cursor={isLink ? 'pointer' : 'auto'}>
      <StyledAvatar src={user.pictureUrl} />

      <Box>
        <ItemText>{user.username}</ItemText>
        <ItemSubText>{user.fullName}</ItemSubText>
      </Box>
    </Wrapper>
  )

  if (!isLink) return content

  return <Link href={href || `/users/${user.id}`}>{content}</Link>
}

export default UserListItem
