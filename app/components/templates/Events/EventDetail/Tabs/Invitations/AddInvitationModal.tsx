import { useState } from 'react'
import { useQuery } from 'react-query'

import api from '@api/HttpClient'
import useDebounce from '@hooks/useDebounce'
import { SearchModal, SearchModalItem } from '@modules/SearchModal'
import { IUserDto } from 'domainTypes'
import { IApiError } from '@api/types'
import FetchError from '@elements/FetchError/FetchError'
import UserListItem from '@elements/UserListItem/UserListItem'
import Button from '@elements/Button/Button'
import { Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

interface IAddInvitationModalProps {
  eventId: string
  onClose: () => void
}

const AddInvitationModal = ({ eventId, onClose }: IAddInvitationModalProps) => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { t } = useTranslation('common')

  const { data, isFetching, error } = useQuery<IUserDto[], IApiError>(
    ['events', eventId, 'invitations', 'new', debouncedSearch],
    async () =>
      await (await api.get(`/events/${eventId}/invitations/new?search=${debouncedSearch}`)).data,
    { initialData: [], keepPreviousData: true }
  )

  if (error) return <FetchError error={error} />

  return (
    <SearchModal
      title='Invite people'
      onClose={onClose}
      isFetching={isFetching}
      items={data!}
      search={search}
      setSearch={setSearch}
      renderItem={x => (
        <SearchModalItem disableRipple>
          <UserListItem user={x} />

          <Box marginLeft='auto'>
            <Button size='small'>{t('invite')}</Button>
          </Box>
        </SearchModalItem>
      )}
    />
  )
}

export default AddInvitationModal
