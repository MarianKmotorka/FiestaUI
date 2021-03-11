import { TextField } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'

import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'
import { Wrapper, OptionText, Option } from './Search.styled'

interface IProps {
  onSelected: (location: IGoogleMapLocation) => void
}

const Search = ({ onSelected }: IProps) => {
  const { t } = useTranslation('common')
  const {
    ready,
    value,
    suggestions: { loading, status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete()

  const handleSelected = async (value: any) => {
    if (!value) return
    setValue(value.description)
    clearSuggestions()

    try {
      const { geometry } = await getDetails({ placeId: value.place_id })
      const { lat, lng } = geometry.location
      const location = await getLocation({ lat: lat(), lng: lng() })
      onSelected(location)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Wrapper>
      <Autocomplete
        loading={loading}
        disabled={!ready}
        getOptionLabel={x => x.description}
        options={status === 'OK' ? data : []}
        onChange={(_, value) => handleSelected(value)}
        getOptionSelected={(option, curr) => option.place_id === curr.place_id}
        renderOption={option => (
          <Option>
            <LocationOn />
            <OptionText>{option.description}</OptionText>
          </Option>
        )}
        renderInput={props => (
          <TextField
            {...props}
            onChange={e => setValue(e.target.value)}
            value={value}
            variant='outlined'
            color='secondary'
            placeholder={`${t('search')}...`}
          />
        )}
        loadingText={<OptionText>{t('loading')}...</OptionText>}
        noOptionsText={<OptionText>{t('nothingFound')}</OptionText>}
      />
    </Wrapper>
  )
}

export default Search
