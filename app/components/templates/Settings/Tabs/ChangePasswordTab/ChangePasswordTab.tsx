import { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { AccordionDetails, AccordionSummary } from '@material-ui/core'

import Form from '@elements/HookForm/Form'
import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { successToast } from 'services/toastService'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import {
  requiredValidator,
  combineValidators,
  minLengthValidator,
  createRepeatPasswordValidator
} from 'utils/validators'

import { Wrapper } from './ChangePasswordTab.styled'
import { SettingsAccordion, AccordionTitle } from '../common.styled'

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
  const [expanded, setExpanded] = useState(true)
  const { currentUser } = useAuthorizedUser()

  const { onSubmit, submitting } = useSubmitForm<IChangePasswordValues>({
    url: '/auth/change-password',
    formatter: values => ({ ...values, userId: currentUser.id }),
    successCallback: () => successToast(t('success')),
    errorCallback: (err, { setError }) => {
      if (err.errorDetails.length === 0)
        setError('currentPassword', { message: t(`validator.${err.errorMessage}`) })
    }
  })

  return (
    <Wrapper>
      <SettingsAccordion expanded={expanded} onChange={(_, value) => setExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('changePassword')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          <Form onSubmit={onSubmit} defaultValues={defaultValues}>
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
          </Form>
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default ChangePasswordTab
