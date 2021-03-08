import { useCallback, useMemo, useRef, useState } from 'react'
import { LatLon } from 'use-places-autocomplete'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'

import Search from './Search/Search'
import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'
import { lightMapStyle, darkMapStyle } from './mapStyles'
import { useAppTheme } from '@contextProviders/AppThemeProvider'

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

  const handleMapLoaded = useCallback(map => (mapRef.current = map), [])

  const handleMapClicked = useCallback(
    async (latLng: LatLon) => {
      setMarkerPosition(latLng)
      setFetching(true)
      onChange(await getLocation(latLng))
      setFetching(false)
    },
    [onChange]
  )

  const handleSearch = useCallback(
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
      <Search onSelected={handleSearch} />

      <GoogleMap
        id='googleMap'
        options={mapOptions}
        center={initialValue.current?.latLng || defaultCenter}
        zoom={4}
        onClick={async ({ latLng }) =>
          await handleMapClicked({ lat: latLng.lat(), lng: latLng.lng() })
        }
        onLoad={handleMapLoaded}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </Wrapper>
  )
}

export default Map
