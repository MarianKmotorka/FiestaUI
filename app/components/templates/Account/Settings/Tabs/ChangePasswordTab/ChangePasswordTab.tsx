import { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'

import Button from '@elements/Button/Button'
import Snackbar from '@elements/Snackbar/Snackbar'
import FormInput from '@elements/HookForm/FormInput'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import {
  requiredValidator,
  combineValidators,
  minLengthValidator,
  createRepeatPasswordValidator
} from 'utils/validators'

import { AccordionTitle } from '../../SettingsTemplate.styled'
import { Wrapper } from './ChangePasswordTab.styled'

interface IChangePasswordValues {
  currentPassword: string
  newPassword: string
  repeatPassword: string
}

const defaultValues: IChangePasswordValues = {
  currentPassword: '',
  newPassword: '',
  repeatPassword: ''
}

const ChangePasswordTab = () => {
  const { t } = useTranslation('common')
  const [success, setSuccess] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { currentUser } = useAuthorizedUser()

  const handleSubmitted: OnFormSubmit<IChangePasswordValues> = async (
    values,
    submitHandler,
    { setError }
  ) => {
    await submitHandler({
      data: { ...values, userId: currentUser.id },
      url: '/auth/change-password',
      successCallback: () => setSuccess(true),
      errorCallback: err => {
        if (err.errorDetails.length === 0)
          setError('currentPassword', { message: t(`validator.${err.errorMessage}`) })
      }
    })
  }

  return (
    <Wrapper>
      <Accordion expanded={expanded} onChange={(_, value) => setExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('changePassword')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          <Form onSubmit={handleSubmitted} defaultValues={defaultValues}>
            {({ submitting }) => (
              <>
                <FormInput
                  name='currentPassword'
                  label={t('currentPassword')}
                  type='password'
                  validate={requiredValidator}
                />

                <FormInput
                  name='newPassword'
                  label={t('newPassword')}
                  type='password'
                  validate={combineValidators([requiredValidator, minLengthValidator(6)])}
                />

                <FormInput
                  name='repeatPassword'
                  label={t('repeatPassword')}
                  type='password'
                  validate={combineValidators([
                    requiredValidator,
                    createRepeatPasswordValidator('newPassword')
                  ])}
                />

                <Button variant='outlined' type='submit' loading={submitting}>
                  {t('changePassword')}
                </Button>
              </>
            )}
          </Form>
        </AccordionDetails>
      </Accordion>

      {success && <Snackbar onClose={() => setSuccess(false)} translationKey='success' />}
    </Wrapper>
  )
}

export default ChangePasswordTab
