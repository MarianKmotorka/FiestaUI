import Link from 'next/link'
import { useState } from 'react'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box } from '@material-ui/core'
import { Close, KeyboardArrowRight, Search, SentimentDissatisfied } from '@material-ui/icons'

import { IApiError } from 'types'
import api from '@api/HttpClient'
import Modal from '@elements/Modal'
import useDebounce from '@hooks/useDebounce'
import TextBox from '@elements/TextBox/TextBox'
import { IUserSelector } from 'utils/selectorTypes'
import FetchError from '@elements/FetchError/FetchError'

import { Item, ItemsContainer, StyledCard, StyledCloseButton } from './NavbarSearch.styled'

interface INavbarSearchProps {
  onClose: () => void
}

const NavbarSearch = ({ onClose }: INavbarSearchProps) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, error } = useQuery<IUserSelector[], IApiError>(
    ['users', 'selector', debouncedSearch],
    async () => (await api.get(`/users/selector?search=${debouncedSearch}`)).data,
    { initialData: [] }
  )

  if (error) return <FetchError error={error} />
  const items = data!

  return (
    <Modal open onClose={onClose}>
      <StyledCard>
        <StyledCloseButton onClick={onClose}>
          <Close />
        </StyledCloseButton>

        <Box margin='60px auto 40px' width='84%'>
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
          {items.map(x => (
            <Link key={x.id} href={`/users/${x.id}`}>
              <Item onClick={onClose}>
                <Avatar src={x.pictureUrl} />
                <Box display='flex' flexDirection='column' justifyContent='center'>
                  <p>{x.username}</p>
                  <span>{x.fullName}</span>
                </Box>
                <KeyboardArrowRight />
              </Item>
            </Link>
          ))}

          {isEmpty(items) && (
            <Item>
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
