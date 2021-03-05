import { LatLon } from 'use-places-autocomplete'
import geo from 'react-geocode'

export interface IGoogleMapLocation {
  latLng: LatLon
  street: string
  streetNumber: string
  premise: string
  city: string
  state: string
  administrativeAreaLevel1: string
  administrativeAreaLevel2: string
  postalCode: string
  googleMapsUrl: string
}

const getAddressByType = (type: string, addressComponents: any[]): string => {
  for (var i = 0; i < addressComponents.length; i++)
    for (var j = 0; j < addressComponents[i].types.length; j++)
      if (addressComponents[i].types[j] === type) return addressComponents[i].long_name

  return ''
}

const getGoogleMapsUrl = ({ lat, lng }: LatLon) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

export const getLocation = async (latLng: LatLon): Promise<IGoogleMapLocation> => {
  const detail = await geo.fromLatLng(
    `${latLng.lat}`,
    `${latLng.lng}`,
    process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY
  )
  const components = detail.results[0].address_components

  return {
    latLng,
    streetNumber: getAddressByType('street_number', components),
    premise: getAddressByType('premise', components),
    street: getAddressByType('route', components),
    city: getAddressByType('locality', components),
    postalCode: getAddressByType('postal_code', components),
    administrativeAreaLevel2: getAddressByType('administrative_area_level_2', components),
    administrativeAreaLevel1: getAddressByType('administrative_area_level_1', components),
    state: getAddressByType('country', components),
    googleMapsUrl: getGoogleMapsUrl(latLng)
  }
}
