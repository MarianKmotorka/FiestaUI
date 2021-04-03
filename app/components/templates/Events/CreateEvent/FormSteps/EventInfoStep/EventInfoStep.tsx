import { ReactNode } from 'react'
import { lowerFirst } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { Box, MenuItem } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { Group, KeyboardArrowRight, Lock, Public } from '@material-ui/icons'

import { endDateValidator } from '../../utils'
import Button from '@elements/Button/Button'
import { enumToKeyValueArray } from 'utils/utils'
import { AccessibilityTypeEnum } from 'domainTypes'
import FormInput from '@elements/HookForm/FormInput'
import FormSelect from '@elements/HookForm/FormSelect'
import FormDateTimePicker from '@elements/HookForm/FormDateTimePicker'
import {
  combineValidators,
  minNumericValue,
  requiredValidator,
  maxLengthValidator
} from 'utils/validators'

import { AccessibilityValue, StyledCard } from './EventInfoStep.styled'

interface IEventInfoStepProps {
  nextStep: () => void
}

export const eventInfoFormFields = ['name', 'startDate', 'endDate', 'accessibilityType', 'capacity']

const accessibilityIconMap: Record<number, ReactNode> = {
  [AccessibilityTypeEnum.Public]: <Public />,
  [AccessibilityTypeEnum.Private]: <Lock />,
  [AccessibilityTypeEnum.FriendsOnly]: <Group />
}

const EventInfoStep = ({ nextStep }: IEventInfoStepProps) => {
  const { t } = useTranslation('common')
  const { trigger } = useFormContext()

  const handleNext = async () => {
    const isValid = await trigger(eventInfoFormFields)
    isValid && nextStep()
  }

  const accessibilityTypeRenderer = (value: any): ReactNode => (
    <AccessibilityValue>
      {accessibilityIconMap[value]}
      {t(`enum.accessibilityTypeEnum.${lowerFirst(AccessibilityTypeEnum[value])}`)}
    </AccessibilityValue>
  )

  return (
    <>
      <StyledCard elevation={0}>
        <FormInput
          name='name'
          label={t('name')}
          variant='outlined'
          validate={combineValidators([requiredValidator, maxLengthValidator(30)])}
        />

        <FormDateTimePicker
          name='startDate'
          label={t('startDate')}
          inputVariant='outlined'
          validate={requiredValidator}
          disablePast
        />

        <FormDateTimePicker
          name='endDate'
          label={t('endDate')}
          inputVariant='outlined'
          disablePast
          validate={combineValidators([requiredValidator, endDateValidator])}
        />

        <FormInput
          min={0}
          type='number'
          name='capacity'
          variant='outlined'
          label={t('maxNumberOfPeople')}
          validate={combineValidators([requiredValidator, minNumericValue(2)])}
        />

        <FormSelect
          variant='outlined'
          name='accessibilityType'
          label={t('accessibility')}
          renderValue={accessibilityTypeRenderer}
        >
          {enumToKeyValueArray(AccessibilityTypeEnum).map(({ key, value }) => (
            <MenuItem key={key} value={value}>
              {t(`enum.accessibilityTypeEnum.${lowerFirst(key)}`)}
            </MenuItem>
          ))}
        </FormSelect>

        <FormInput
          name='description'
          label={t('description')}
          multiline
          rows={7}
          rowsMax={13}
          variant='outlined'
          validate={maxLengthValidator(500)}
        />
      </StyledCard>

      <Box display='flex' justifyContent='center' marginY='20px'>
        <Button onClick={handleNext} endIcon={<KeyboardArrowRight />}>
          {t('next')}
        </Button>
      </Box>
    </>
  )
}

export default EventInfoStep
