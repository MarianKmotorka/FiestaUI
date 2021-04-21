import Link from 'next/link'
import moment from 'moment'
import { Avatar, Box } from '@material-ui/core'
import { Edit, Event, KeyboardArrowRight, LocationOn, Schedule } from '@material-ui/icons'

import useWindowSize from '@hooks/useWindowSize'
import { EventAndUserSelectorItem, ItemType } from './types'

import { Item, ItemInfo } from './NavbarSearch.styled'

interface IEventItemProps {
  item: EventAndUserSelectorItem
  onClose: () => void
}

const EventItem = ({ item, onClose }: IEventItemProps) => {
  const { minMedium } = useWindowSize()

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

            <Box marginLeft='7px' display='flex' alignItems='center' gridGap='1px'>
              <LocationOn />
              {item.location}
            </Box>
          </span>

          {item.description && (
            <span>
              <Box display='flex' alignItems='center' gridGap='3px'>
                <Edit />
                {item.description}
              </Box>
            </span>
          )}
        </ItemInfo>

        {minMedium && <KeyboardArrowRight />}
      </Item>
    </Link>
  )
}

export default EventItem
