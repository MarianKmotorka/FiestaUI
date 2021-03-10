import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { isArray, isEmpty, toLower } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { Clear, ExpandLess, ExpandMore } from '@material-ui/icons'

import api from '@api/HttpClient'
import Spinner from '@elements/Spinner'
import useDebounce from '@hooks/useDebounce'
import TextBox from '@elements/TextBox/TextBox'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { ISearchableDropdownProps, IFetchOptions } from './types'

import {
  Wrapper,
  ClearAndExpandIcons,
  Expander,
  Item,
  StartIconWrapper
} from './SearchableDropdown.styled'

const SearchableDropdown = <
  TValue extends { [key: string]: any } = any,
  TFormatted extends { [key: string]: any } = TValue
>({
  options: initialOptions,
  value,
  icon,
  error,
  maxHeight,
  onChange,
  optionRenderer,
  keyProp = 'id',
  valueProp = 'value',
  ...rest
}: ISearchableDropdownProps<TValue, TFormatted>) => {
  const { t } = useTranslation('common')
  const [options, setOptions] = useState<TFormatted[]>([])
  const [expanded, setExpanded] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState<string | undefined>(value?.[valueProp])
  const debouncedSearch = useDebounce(search, isArray(initialOptions) ? 0 : 500)
  const wrapperRef = useOnClickOutside<HTMLDivElement>(() => {
    setExpanded(false)
    setSearch(value?.[valueProp])
  })

  useEffect(() => {
    if (!expanded) return

    const setOptionsFromProps = () => {
      const filtered = (initialOptions as TFormatted[]).filter(x =>
        toLower(x[valueProp]).includes(toLower(debouncedSearch))
      )
      setOptions(filtered)
    }

    const setOptionsFromApi = async () => {
      const {
        url,
        params,
        formatter = x => (x as never) as TFormatted
      } = initialOptions as IFetchOptions<TValue, TFormatted>

      setFetching(true)
      const { data } = await api.get(`${url}?search=${debouncedSearch}`, { params })
      setFetching(false)

      const formatted = (data as TValue[]).map(formatter)
      setOptions(formatted)
    }

    if (isArray(initialOptions)) setOptionsFromProps()
    else setOptionsFromApi()
  }, [debouncedSearch, initialOptions, expanded, valueProp])

  useEffect(() => {
    setSearch(value?.[valueProp])
  }, [value, valueProp])

  const handleSelected = (selectedValue?: TFormatted) => {
    onChange(selectedValue)
    setExpanded(false)
  }

  const handleClear = () => {
    onChange(undefined)
    setSearch('')
  }

  return (
    <Wrapper ref={wrapperRef}>
      <TextBox
        variant='outlined'
        color='secondary'
        {...rest}
        error={expanded ? undefined : error}
        value={search || ''}
        onChange={setSearch}
        onFocus={() => setExpanded(true)}
        fullWidth
        InputProps={{
          startAdornment: icon ? <StartIconWrapper>{icon}</StartIconWrapper> : undefined,
          endAdornment: (
            <ClearAndExpandIcons>
              {search && <Clear fontSize='small' id='clear-icon' onClick={handleClear} />}

              {expanded ? (
                <ExpandLess onClick={() => setExpanded(false)} />
              ) : (
                <ExpandMore onClick={() => setExpanded(true)} />
              )}
            </ClearAndExpandIcons>
          )
        }}
      />

      {expanded && (
        <Expander elevation={4} maxHeight={maxHeight}>
          {fetching && (
            <Box display='flex' justifyContent='center'>
              <Spinner />
            </Box>
          )}

          {!fetching && isEmpty(options) && <Item fontSize='0.9rem'>{t('nothingFound')}</Item>}

          {!fetching &&
            options.map(x => (
              <Item onClick={() => handleSelected(x)} key={x[keyProp]}>
                {optionRenderer ? optionRenderer(x) : x[valueProp]}
              </Item>
            ))}
        </Expander>
      )}
    </Wrapper>
  )
}

export default SearchableDropdown
