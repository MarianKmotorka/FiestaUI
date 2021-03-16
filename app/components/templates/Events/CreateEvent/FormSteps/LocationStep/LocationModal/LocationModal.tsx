import { useState } from 'react'
import { Modal } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { KeyboardArrowRight } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import TextBox from '@elements/TextBox/TextBox'
import { IGoogleMapLocation } from 'utils/googleUtils'

import { StyledCard, Title } from './LocationModal.styled'

interface ILocationModalProps {
  onSuccess: () => void
  onClose: () => void
}

const LocationModal = ({ onSuccess, onClose }: ILocationModalProps) => {
  const { getValues, setValue } = useFormContext()
  const { t } = useTranslation('common')

  const [location, setLocation] = useState<IGoogleMapLocation>(getValues()['location'])

  const setLocationKey = (key: string) => (value: string) => {
    setLocation(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    setValue('location', location)
    onSuccess()
    onClose()
  }

  return (
    <Modal open onClose={onClose}>
      <StyledCard>
        <Title>{t('reviewAddress')}</Title>

        <TextBox
          label={t('streetNumber')}
          value={location.streetNumber}
          onChange={setLocationKey('streetNumber')}
        />

        <TextBox label={t('street')} value={location.street} onChange={setLocationKey('street')} />

        <TextBox label={t('city')} value={location.city} onChange={setLocationKey('city')} />

        <TextBox
          label={t('postalCode')}
          value={location.postalCode}
          onChange={setLocationKey('postalCode')}
        />

        <TextBox
          label={t('administrativeAreaLevel1')}
          value={location.administrativeAreaLevel1}
          onChange={setLocationKey('administrativeAreaLevel1')}
        />

        <TextBox
          label={t('administrativeAreaLevel2')}
          value={location.administrativeAreaLevel2}
          onChange={setLocationKey('administrativeAreaLevel2')}
        />

        <TextBox label={t('state')} value={location.state} onChange={setLocationKey('state')} />

        <Button onClick={handleNext} endIcon={<KeyboardArrowRight />}>
          {t('next')}
        </Button>
      </StyledCard>
    </Modal>
  )
}

export default LocationModal
