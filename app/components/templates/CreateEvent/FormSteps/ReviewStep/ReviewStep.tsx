import { useFormContext } from 'react-hook-form'
import { keys, lowerFirst } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { EditOutlined, KeyboardArrowLeft } from '@material-ui/icons'
import { Box, Card, CardContent, Grid, IconButton } from '@material-ui/core'

import Button from '@elements/Button/Button'
import { AccessibilityTypeEnum } from 'domainTypes'
import KeyValueRow from '@elements/KeyValueRow/KeyValueRow'
import { redirectToStepByErrorFieldName } from '../../utils'
import { ICreateEventFormValues } from '@templates/CreateEvent/CreateEventTemplate'

import { Title, Wrapper } from './ReviewStep.styled'

interface IReviewStepProps {
  submitting: boolean
  prevStep: (index?: number) => void
}

const ReviewStep = ({ prevStep }: IReviewStepProps) => {
  const { getValues, trigger, errors } = useFormContext<ICreateEventFormValues>()
  const { t } = useTranslation('common')
  const values = getValues()
  const { location } = values

  const validateAndRedirectToErrorStep = async () => {
    const isFormValid = await trigger()
    if (!isFormValid) {
      redirectToStepByErrorFieldName(keys(errors), prevStep)
    }
  }

  return (
    <Wrapper>
      <Grid container spacing={3} wrap='wrap'>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Title>
                {t('eventInfo')}
                <IconButton onClick={() => prevStep(0)}>
                  <EditOutlined />
                </IconButton>
              </Title>

              <KeyValueRow keyName={t('name')} value={values.name} />
              <KeyValueRow keyName={t('startDate')} value={values.startDate?.toDateString()} />
              <KeyValueRow keyName={t('endDate')} value={values.endDate?.toDateString()} />
              <KeyValueRow keyName={t('maxNumberOfPeople')} value={values.capacity} />
              <KeyValueRow
                keyName={t('accessibility')}
                value={t(
                  `enum.accessibilityTypeEnum.${lowerFirst(
                    AccessibilityTypeEnum[values.accessibilityType]
                  )}`
                )}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Title>
                {t('location')}
                <IconButton onClick={() => prevStep(1)}>
                  <EditOutlined />
                </IconButton>
              </Title>

              <KeyValueRow keyName={t('streetNumber')} value={location?.streetNumber} />
              <KeyValueRow keyName={t('street')} value={location?.street} />
              <KeyValueRow keyName={t('city')} value={location?.city} />
              <KeyValueRow keyName={t('postalCode')} value={location?.postalCode} />
              <KeyValueRow
                keyName={t('administrativeAreaLevel2')}
                value={location?.administrativeAreaLevel2}
              />
              <KeyValueRow
                keyName={t('administrativeAreaLevel1')}
                value={location?.administrativeAreaLevel1}
              />
              <KeyValueRow keyName={t('state')} value={location?.state} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box marginY='40px' display='flex' justifyContent='center' gridGap='20px'>
        <Button
          onClick={() => prevStep()}
          color='secondary'
          variant='text'
          startIcon={<KeyboardArrowLeft />}
        >
          {t('back')}
        </Button>

        <Button type='submit' size='large' onClick={validateAndRedirectToErrorStep}>
          {t('submit').toUpperCase()}
        </Button>
      </Box>
    </Wrapper>
  )
}

export default ReviewStep
