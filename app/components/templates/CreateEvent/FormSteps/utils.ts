import { SubmitFormatter } from '@elements/HookForm/hooks/useSubmitForm'
import { omit } from 'lodash'
import { Validator } from 'types'
import { IGoogleMapLocation } from 'utils/googleUtils'
import { ICreateEventFormValues } from '../CreateEventTemplate'
import { eventInfoFormFields } from './EventInfoStep/EventInfoStep'

export const locationValidator: Validator<ICreateEventFormValues, IGoogleMapLocation> = (
  value,
  t
) => {
  return value?.latLng ? undefined : t('validator.locationMustBeSelected')
}

export const endDateValidator: Validator<ICreateEventFormValues, Date> = (
  value,
  t,
  { getValues }
) => {
  const startDate = getValues()['startDate']
  if (!startDate) return

  return startDate > value ? t('validator.mustBeAfterStartDate') : undefined
}

export const getStep = (value: any) => {
  const step = parseInt(value)
  return isNaN(step) ? 0 : step
}

export const stepTitles = ['provideEventInfo', 'pickLocation', 'review']

export const submitFormatter: SubmitFormatter<ICreateEventFormValues> = values => {
  const locationWithoutLatLng = omit(values.location, 'latLng')
  const {
    latLng: { lat, lng }
  } = values.location

  return { ...values, location: { ...locationWithoutLatLng, latitude: lat, longitude: lng } }
}

export const stepIndexes = {
  eventInfoStep: 0,
  locationStep: 1,
  reviewStep: 2
}

export const redirectToStepByErrorFieldName = (
  errorFields: string[],
  redirect: (index: number) => void
) => {
  if (errorFields.some(x => eventInfoFormFields.includes(x))) redirect(stepIndexes.eventInfoStep)
}
