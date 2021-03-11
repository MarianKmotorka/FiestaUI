import { TextField } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import { getDetails, Suggestions } from 'use-places-autocomplete'

import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'
import { Wrapper, OptionText, Option } from './Search.styled'

interface IProps {
  value: string
  suggestions: Suggestions
  onChange: (location: IGoogleMapLocation) => void
  setValue: (value: string, shouldFetch?: boolean) => void
}

const Search = ({ value, suggestions: { loading, data, status }, setValue, onChange }: IProps) => {
  const { t } = useTranslation('common')

  const handleSelected = async (value: any) => {
    if (!value) return

    try {
      const { geometry } = await getDetails({ placeId: value.place_id })
      const { lat, lng } = geometry.location
      const location = await getLocation({ lat: lat(), lng: lng() })
      onChange(location)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Wrapper>
      <Autocomplete
        loading={loading}
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
            value={value} // this value is not reflected when set using "setValue()" prop, autocomplete replacement needed
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
