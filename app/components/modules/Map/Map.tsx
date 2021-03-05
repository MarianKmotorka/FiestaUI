import { useMemo } from 'react'
import { LatLon } from 'use-places-autocomplete'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'

import Search from './Search/Search'
import { IGoogleMapLocation } from 'utils/googleUtils'
import { lightMapStyle, darkMapStyle } from './mapStyles'
import { useAppTheme } from '@contextProviders/AppThemeProvider'

import { Wrapper } from './Map.styled'

const libraries: Libraries = ['places']
interface IMapProps {
  latLng?: LatLon
  center: LatLon
  onLoad: (map: any) => void
  onClick: (latlng: LatLon) => Promise<void>
  onSearch: (location: IGoogleMapLocation) => void
}

const Map = ({ latLng, center, onClick, onLoad, onSearch }: IMapProps) => {
  const { isDark } = useAppTheme()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const mapOptions = useMemo(
    () => ({
      styles: isDark ? darkMapStyle : lightMapStyle,
      disableDefaultUI: true,
      zoomControl: true
    }),
    [isDark]
  )

  if (loadError) return <p>{loadError.message}</p>
  if (!isLoaded) return <p>Loading...</p>

  return (
    <Wrapper>
      <Search onSelected={onSearch} />

      <GoogleMap
        id='googleMap'
        options={mapOptions}
        center={center}
        zoom={4}
        onClick={({ latLng }) => onClick({ lat: latLng.lat(), lng: latLng.lng() })}
        onLoad={onLoad}
      >
        {latLng && <Marker position={latLng} />}
      </GoogleMap>
    </Wrapper>
  )
}

export default Map
