import Link from 'next/link'
import moment from 'moment'
import { Box } from '@material-ui/core'
import { Edit, Event, KeyboardArrowRight, LocationOn, Schedule } from '@material-ui/icons'

import Avatar from '@elements/Avatar'
import { EventAndUserSelectorItem, ItemType } from './types'
import { EllipsisOverflow, Item, ItemInfo } from './NavbarSearch.styled'

interface IEventItemProps {
  item: EventAndUserSelectorItem
  onClose: () => void
}

const EventItem = ({ item, onClose }: IEventItemProps) => {
  if (item.type === ItemType.User) return <></>

  return (
    <Link href={`/events/${item.id}`}>
      <Item onClick={onClose}>
        <Avatar variant='rounded' src={item.pictureUrl}>
          <Event />
        </Avatar>

        <ItemInfo>
          <p>{item.displayName}</p>

          <span>
            <Box display='flex' alignItems='center' gridGap='3px'>
              <Schedule />
              {moment(item.startDate).format('DD.MM.YYYY')}
            </Box>

            <Box
              marginLeft='7px'
              display='flex'
              alignItems='center'
              gridGap='1px'
              overflow='hidden'
            >
              <LocationOn />
              <EllipsisOverflow>{item.location}</EllipsisOverflow>
            </Box>
          </span>

          {item.description && (
            <span>
              <Box display='flex' alignItems='center' gridGap='3px' overflow='hidden'>
                <Edit />
                <EllipsisOverflow>{item.description}</EllipsisOverflow>
              </Box>
            </span>
          )}
        </ItemInfo>

        <KeyboardArrowRight />
      </Item>
    </Link>
  )
}

export default EventItem
