import Link from 'next/link'
import { Box } from '@material-ui/core'
import { Event } from '@material-ui/icons'

import Avatar from '@elements/Avatar'
import { IEventDto } from 'domainTypes'
import { toLocalTime } from '@utils/utils'
import { accessibilityTypeIconMap } from '@utils/iconMaps'

import {
  ItemHeader,
  ItemSubText,
  ItemSubTextContainer,
  ItemText,
  Wrapper
} from './EventListItem.styled'

interface IEventListItemProps {
  event: IEventDto
  href?: string
  className?: string
  isLink?: boolean
  onClick?: () => void
}

const EventListItem = ({ event, isLink, href, className, onClick }: IEventListItemProps) => {
  const { startDate, bannerUrl, accessibilityType, id, name, location } = event

  const content = (
    <Wrapper className={className} cursor={isLink ? 'pointer' : 'auto'} onClick={onClick}>
      <Avatar src={bannerUrl} variant='rounded'>
        <Event />
      </Avatar>

      <Box>
        <ItemHeader>
          <ItemText>{name}</ItemText>
          {accessibilityTypeIconMap[accessibilityType]}
        </ItemHeader>

        <ItemSubTextContainer>
          <ItemSubText>{toLocalTime(startDate, 'DD MMMM yyyy')}</ItemSubText> •
          <ItemSubText>{location}</ItemSubText>
        </ItemSubTextContainer>
      </Box>
    </Wrapper>
  )

  if (!isLink) return content

  return <Link href={href || `/events/${id}`}>{content}</Link>
}

export default EventListItem
