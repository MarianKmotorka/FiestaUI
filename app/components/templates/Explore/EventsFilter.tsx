import { filter } from 'lodash'
import { Chip } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { FiltersWrapper } from './ExploreTemplate.styled'

export enum OnlineFilter {
  All = 0,
  OnlineOnly = 1,
  OfflineOnly = 2
}

export interface IEventsFilter {
  onlineFilter: OnlineFilter
}

interface IEventsFilterProps {
  filter: IEventsFilter
  onChange: (filter: IEventsFilter) => void
  disabled?: boolean
}

const EventsFilter = ({ filter: { onlineFilter }, disabled, onChange }: IEventsFilterProps) => {
  const { t } = useTranslation('common')

  const handleOnlineFilterChange = (newValue: OnlineFilter) => {
    if (disabled) return
    if (newValue === onlineFilter) return onChange({ ...filter, onlineFilter: OnlineFilter.All })
    return onChange({ ...filter, onlineFilter: newValue })
  }

  return (
    <FiltersWrapper>
      <Chip
        label={t('onlineOnly')}
        variant={onlineFilter === OnlineFilter.OnlineOnly ? 'default' : 'outlined'}
        color={onlineFilter === OnlineFilter.OnlineOnly ? 'primary' : 'default'}
        onClick={() => handleOnlineFilterChange(OnlineFilter.OnlineOnly)}
      />
      <Chip
        label={t('offlineOnly')}
        variant={onlineFilter === OnlineFilter.OfflineOnly ? 'default' : 'outlined'}
        color={onlineFilter === OnlineFilter.OfflineOnly ? 'primary' : 'default'}
        onClick={() => handleOnlineFilterChange(OnlineFilter.OfflineOnly)}
      />
    </FiltersWrapper>
  )
}

export default EventsFilter
