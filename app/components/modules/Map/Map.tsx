import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import usePlacesAutocomplete, { LatLon } from 'use-places-autocomplete'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'
import { compact, join } from 'lodash'

import Search from './Search/Search'
import { lightMapStyle, darkMapStyle } from './mapStyles'
import { useAppTheme } from '@contextProviders/AppThemeProvider'
import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'

import { Wrapper } from './Map.styled'

const libraries: Libraries = ['places']
const defaultCenter = { lat: 48, lng: 12 }

interface IMapProps {
  value?: IGoogleMapLocation
  onChange: (address: IGoogleMapLocation) => void
}

const Map = ({ value, onChange }: IMapProps) => {
  const { isDark } = useAppTheme()
  const mapRef = useRef<any>()
  const initialValue = useRef(value)
  const [, setFetching] = useState(false) // TODO: use to indicate loading
  const [markerPosition, setMarkerPosition] = useState(initialValue.current?.latLng)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const {
    init,
    value: searchValue,
    suggestions,
    setValue: setSearchValue,
    ready: autocompleteReady
  } = usePlacesAutocomplete({
    debounce: 300,
    initOnMount: false
  })

  useEffect(() => {
    isLoaded && init()
  }, [isLoaded, init])

  const handleMapLoaded = useCallback(map => (mapRef.current = map), [])

  const handleMapClicked = useCallback(
    async (latLng: LatLon) => {
      setFetching(true)
      setMarkerPosition(latLng)

      const location = await getLocation(latLng)
      const { streetNumber, street, city, administrativeAreaLevel1 } = location
      var locationString = join(
        compact([streetNumber, street, city, administrativeAreaLevel1]),
        ', '
      )

      setSearchValue(locationString, false)
      onChange(location)
      setFetching(false)
    },
    [onChange, setSearchValue]
  )

  const handleSearched = useCallback(
    (location: IGoogleMapLocation) => {
      mapRef.current.panTo(location.latLng)
      mapRef.current.setZoom(14)
      onChange(location)
      setMarkerPosition(location.latLng)
    },
    [onChange]
  )

  const mapOptions = useMemo(
    () => ({
      styles: isDark ? darkMapStyle : lightMapStyle,
      disableDefaultUI: true,
      fullscreenControl: true
    }),
    [isDark]
  )

  if (loadError) return <p>{loadError.message}</p>
  if (!isLoaded) return <p>Loading...</p>

  return (
    <Wrapper>
      <Search
        value={searchValue}
        suggestions={suggestions}
        ready={autocompleteReady}
        setValue={setSearchValue}
        onChange={handleSearched}
      />

      <GoogleMap
        zoom={4}
        id='googleMap'
        options={mapOptions}
        onLoad={handleMapLoaded}
        center={initialValue.current?.latLng || defaultCenter}
        onClick={async ({ latLng }) =>
          await handleMapClicked({ lat: latLng.lat(), lng: latLng.lng() })
        }
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </Wrapper>
  )
}

export default Map
