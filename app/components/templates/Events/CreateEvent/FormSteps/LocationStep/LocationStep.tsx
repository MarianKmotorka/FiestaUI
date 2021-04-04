import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useFormContext, useFormState } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

import Button from '@elements/Button/Button'
import { locationValidator } from '../../utils'
import LocationModal from './LocationModal/LocationModal'
import FormGoogleMap from '@elements/HookForm/FormGoogleMap'

import { StyledCard } from './LocationStep.styled'
import { ICreateEventFormValues } from '../../CreateEventTemplate'

interface ILocationStepProps {
  nextStep: () => void
  prevStep: (index?: number) => void
}

const LocationStep = ({ nextStep, prevStep }: ILocationStepProps) => {
  const { t } = useTranslation('common')
  const { trigger } = useFormContext()
  const { errors } = useFormState<ICreateEventFormValues>()
  const [modalOpen, setModalOpen] = useState(false)

  const handleNextClick = () => {
    trigger('location')
    errors.location || setModalOpen(true)
  }

  return (
    <div>
      <StyledCard elevation={0}>
        <FormGoogleMap name='location' validate={locationValidator} />
      </StyledCard>

      <Box marginY='25px' display='flex' justifyContent='center' gridGap='20px'>
        <Button
          onClick={() => prevStep()}
          color='secondary'
          variant='text'
          startIcon={<KeyboardArrowLeft />}
        >
          {t('back')}
        </Button>

        <Button onClick={handleNextClick} endIcon={<KeyboardArrowRight />}>
          {t('reviewAddress')}
        </Button>
      </Box>

      {modalOpen && <LocationModal onClose={() => setModalOpen(false)} onSuccess={nextStep} />}
    </div>
  )
}

export default LocationStep
