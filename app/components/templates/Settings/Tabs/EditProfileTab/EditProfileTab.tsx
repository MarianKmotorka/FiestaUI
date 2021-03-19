import React, { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { AccordionDetails, AccordionSummary } from '@material-ui/core'

import Spinner from '@elements/Spinner'
import Form from '@elements/HookForm/Form'
import { successToast } from 'services/toastService'
import FormInput from '@elements/HookForm/FormInput'
import SubmitButton from '@elements/HookForm/SubmitButton'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { onlyDirtyValues, useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import {
  requiredValidator,
  combineValidators,
  minLengthValidator,
  maxLengthValidator
} from 'utils/validators'
import ProfilePictureMenu from './ProfilePictureMenu/ProfilePictureMenu'

import { AccordionTitle, SettingsAccordion } from '../common.styled'
import { Wrapper, StyledAvatar, StyledDivider } from './EditProfileTab.styled'

interface IEditResponse {
  id: string
  firstName: string
  lastName: string
  fullName: string
}

interface IEditProfileValues {
  firstName: string
  lastName: string
}

const EditProfileTab = () => {
  const { t } = useTranslation('common')
  const [expanded, setExpanded] = useState(true)
  const [profilePictureEl, setProfilePictureEl] = useState<HTMLElement>()
  const { currentUser, updateUser } = useAuthorizedUser()
  const [profilePictureLoading, setProfilePictureLoading] = useState(false)

  const { onSubmit } = useSubmitForm<IEditProfileValues, IEditResponse>({
    method: 'patch',
    url: `/users/${currentUser.id}`,
    formatter: onlyDirtyValues,
    successCallback: response => {
      successToast(t('saved'))
      updateUser(response)
    }
  })

  return (
    <Wrapper>
      <SettingsAccordion expanded={expanded} onChange={(_, value) => setExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('editProfile')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {profilePictureLoading ? (
            <Spinner themed />
          ) : (
            <StyledAvatar
              src={currentUser.pictureUrl}
              onClick={e => setProfilePictureEl(profilePictureEl ? undefined : e.currentTarget)}
            />
          )}

          <StyledDivider />

          <Form onSubmit={onSubmit} defaultValues={currentUser}>
            <FormInput
              name='firstName'
              label={t('firstName')}
              validate={combineValidators([
                requiredValidator,
                minLengthValidator(2),
                maxLengthValidator(30)
              ])}
            />

            <FormInput
              name='lastName'
              label={t('lastName')}
              validate={combineValidators([
                requiredValidator,
                minLengthValidator(2),
                maxLengthValidator(30)
              ])}
            />

            <SubmitButton variant='outlined'>{t('submit')}</SubmitButton>
          </Form>

          <ProfilePictureMenu
            onClose={() => setProfilePictureEl(undefined)}
            anchorEl={profilePictureEl}
            setLoading={setProfilePictureLoading}
          />
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default EditProfileTab
