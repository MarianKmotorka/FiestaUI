import Link from 'next/link'
import { useState } from 'react'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box, CircularProgress } from '@material-ui/core'
import { Close, KeyboardArrowRight, Search, SentimentDissatisfied } from '@material-ui/icons'

import { IApiError } from '@api/types'
import api from '@api/HttpClient'
import Modal from '@elements/Modal'
import EventItem from './EventItem'
import useDebounce from '@hooks/useDebounce'
import { ItemType, EventAndUserSelectorItem } from './types'
import TextBox from '@elements/TextBox/TextBox'
import useWindowSize from '@hooks/useWindowSize'
import FetchError from '@elements/FetchError/FetchError'

import {
  Item,
  ItemInfo,
  ItemsContainer,
  StyledCard,
  StyledCloseButton
} from './NavbarSearch.styled'

interface INavbarSearchProps {
  onClose: () => void
}

const NavbarSearch = ({ onClose }: INavbarSearchProps) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { minMedium } = useWindowSize()

  const { data, error, isFetching } = useQuery<EventAndUserSelectorItem[], IApiError>(
    ['users', 'selector', debouncedSearch],
    async () => (await api.get(`/selectors/events-and-users?search=${debouncedSearch}`)).data,
    { initialData: [] }
  )

  if (error) return <FetchError error={error} />
  const items = data!

  const renderItem = (item: EventAndUserSelectorItem) =>
    item.type === ItemType.User ? (
      <Link key={item.id} href={`/users/${item.id}`}>
        <Item onClick={onClose}>
          <Avatar src={item.pictureUrl} />

          <ItemInfo>
            <p>{item.displayName}</p>
            <span>{item.fullName}</span>
          </ItemInfo>

          {minMedium && <KeyboardArrowRight />}
        </Item>
      </Link>
    ) : (
      <EventItem key={item.id} item={item} onClose={onClose} />
    )

  return (
    <Modal open onClose={onClose}>
      <StyledCard>
        <StyledCloseButton onClick={onClose}>
          <Close />
        </StyledCloseButton>

        <Box margin='60px auto 20px' width='84%'>
          <TextBox
            fullWidth
            value={search}
            onChange={setSearch}
            placeholder={t('findPeopleOrEvents')}
            InputProps={{
              startAdornment: (
                <Box marginRight='10px' color='themeText.themeGray'>
                  <Search />
                </Box>
              )
            }}
          />
        </Box>

        <ItemsContainer>
          {isFetching && (
            <Item>
              <CircularProgress />
            </Item>
          )}

          {items.map(renderItem)}

          {isEmpty(items) && !isFetching && (
            <Item disabled>
              <Box display='flex' gridGap='10px'>
                {t('nothingFound')}
                <SentimentDissatisfied />
              </Box>
            </Item>
          )}
        </ItemsContainer>
      </StyledCard>
    </Modal>
  )
}

export default NavbarSearch
