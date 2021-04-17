import { useEffect, useState } from 'react'
import { max } from 'lodash'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Step, StepButton, Stepper } from '@material-ui/core'

import {
  getStep,
  redirectToStepByErrorFieldName,
  stepIndexes,
  stepTitles,
  submitFormatter
} from './utils'
import Hidden from '@elements/Hidden'
import Form from '@elements/HookForm/Form'
import { AccessibilityTypeEnum } from 'domainTypes'
import { successToast } from 'services/toastService'
import { IGoogleMapLocation } from 'utils/googleUtils'
import ReviewStep from './FormSteps/ReviewStep/ReviewStep'
import LocationStep from './FormSteps/LocationStep/LocationStep'
import EventInfoStep from './FormSteps/EventInfoStep/EventInfoStep'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'

import { Wrapper } from './CreateEventTemplate.styled'

export interface ICreateEventFormValues {
  name: string
  startDate: Date
  endDate: Date
  accessibilityType: number
  location: IGoogleMapLocation
  capacity: number
  description: string
}

const defaultValues: Partial<ICreateEventFormValues> = {
  name: '',
  accessibilityType: AccessibilityTypeEnum.Public,
  capacity: 2
}

const CreateEvent = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [step, setStep] = useState(getStep(router.query.step))
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const currStep = getStep(router.query.step)
    if (completedSteps.some(x => x === currStep - 1)) setStep(currStep)
    else setStep(0)
  }, [router.query, completedSteps])

  const changeStep = (index: number) =>
    router.push({ pathname: router.pathname, query: { step: index } }, undefined, {
      shallow: true
    })

  const { onSubmit, submitting } = useSubmitForm<ICreateEventFormValues, { id: string }>({
    url: '/events/create',
    canSubmit: step === stepIndexes.reviewStep,
    formatter: submitFormatter,
    successCallback: ({ id }) => {
      successToast(t('success'))
      router.replace(`/events/${id}`)
    },
    errorCallback: ({ errorDetails }) => {
      redirectToStepByErrorFieldName(
        errorDetails.map(x => x.propertyName),
        changeStep
      )
    }
  })

  const nextStep = () => {
    setCompletedSteps(prev => [...prev, step])
    changeStep(step + 1)
  }

  const prevStep = (index?: number) => {
    changeStep(index ?? step - 1)
  }

  const isStepCompletedOrNext = (index: number) =>
    completedSteps.includes(index) || (max(completedSteps) ?? -1) + 1 === index

  return (
    <Wrapper>
      <Stepper alternativeLabel activeStep={step}>
        {stepTitles.map((name, index) => (
          <Step key={name} completed={completedSteps.includes(index)}>
            <StepButton disabled={!isStepCompletedOrNext(index)} onClick={() => changeStep(index)}>
              {t(name)}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Form defaultValues={defaultValues} onSubmit={onSubmit}>
        <Hidden hidden={step !== stepIndexes.eventInfoStep}>
          <EventInfoStep nextStep={nextStep} />
        </Hidden>

        <Hidden hidden={step !== stepIndexes.locationStep}>
          <LocationStep nextStep={nextStep} prevStep={prevStep} />
        </Hidden>

        <Hidden hidden={step !== stepIndexes.reviewStep}>
          <ReviewStep prevStep={prevStep} submitting={submitting} />
        </Hidden>
      </Form>
    </Wrapper>
  )
}

export default CreateEvent
