import { TextField } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'
import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'
import { Wrapper, OptionText, Option } from './Search.styled'

interface IProps {
  onSelected: (address: IGoogleMapLocation) => void
}

const Search = ({ onSelected }: IProps) => {
  const {
    ready,
    value,
    suggestions: { loading, status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete()

  const handleSelect = async (value: any) => {
    if (!value) return
    setValue(value.description, false)
    clearSuggestions()

    try {
      const { geometry } = await getDetails({ placeId: value.place_id })
      const { lat, lng } = geometry.location
      const address = await getLocation({ lat: lat(), lng: lng() })
      onSelected(address)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Wrapper>
      <Autocomplete
        options={status === 'OK' ? data : []}
        onChange={(_, value) => handleSelect(value)}
        loading={loading}
        disabled={!ready}
        getOptionLabel={x => x.description}
        getOptionSelected={(option, curr) => option.description === curr.description}
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
            placeholder='Search...'
          />
        )}
      />
    </Wrapper>
  )
}

export default Search
