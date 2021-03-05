import { useCallback, useRef, useState } from 'react'
import { LatLon } from 'use-places-autocomplete'

import { getLocation, IGoogleMapLocation } from 'utils/googleUtils'
import Map from './Map'

interface IMapLogicProps {
  initialLatLng?: LatLon
  onChange: (address: IGoogleMapLocation) => void
}

const defaultCenter = { lat: 48, lng: 12 }

const MapLogic = ({ initialLatLng, onChange }: IMapLogicProps) => {
  const [latLng, setLatLng] = useState<LatLon | undefined>(initialLatLng)
  const mapRef = useRef<any>()

  const handleMapLoaded = useCallback(map => (mapRef.current = map), [])

  const handleChange = useCallback(
    (location: IGoogleMapLocation) => {
      setLatLng(location.latLng)
      onChange(location)
    },
    [onChange]
  )

  const handleMapClicked = useCallback(
    async latLng => {
      setLatLng(latLng)
      handleChange(await getLocation(latLng))
    },
    [handleChange]
  )

  const handleSearch = useCallback(
    (location: IGoogleMapLocation) => {
      mapRef.current.panTo(location.latLng)
      mapRef.current.setZoom(14)
      handleChange(location)
    },
    [handleChange]
  )

  return (
    <Map
      center={initialLatLng || defaultCenter}
      latLng={latLng}
      onSearch={handleSearch}
      onLoad={handleMapLoaded}
      onClick={handleMapClicked}
    />
  )
}

export default MapLogic
