import { DeleteOutline, Publish } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { useRef, ChangeEvent } from 'react'

import api from '@api/HttpClient'
import { IApiError } from '../../../../../../types'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { MenuContent, StyledInput, StyledMenu, StyledMenuItem } from './ProfilePictureMenu.styled'

interface IProfilePictureMenuProps {
  anchorEl?: HTMLElement
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  onClose: () => void
  setSuccess: () => void
}

const ProfilePictureMenu = ({
  anchorEl,
  onClose,
  setLoading,
  setError,
  setSuccess
}: IProfilePictureMenuProps) => {
  const { t } = useTranslation('common')
  const inputRef = useRef<HTMLInputElement>(null!)
  const { updateUser, currentUser } = useAuthorizedUser()

  const clearInput = () => {
    if (inputRef?.current?.value) inputRef.current.value = ''
  }

  const handleUploadPictureClicked = () => {
    if (!inputRef.current) return
    inputRef.current.click()
    onClose()
  }

  const handleRemovePictureClicked = async () => {
    try {
      setLoading(true)
      onClose()
      await api.delete(`/users/${currentUser.id}/profile-picture`)
      updateUser({ pictureUrl: undefined })
      setSuccess()
    } catch (error) {
      const errors = (error as IApiError).data.errorDetails
      setError(errors?.[0]?.code)
    }
    setLoading(false)
    clearInput()
  }

  const handleInputChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('profilePicture', file as Blob)

    try {
      setLoading(true)
      const { data } = await api.post(`/users/${currentUser.id}/profile-picture`, formData)
      updateUser(data)
      setSuccess()
    } catch (error) {
      const apiError = (error as IApiError).data
      const detail = apiError.errorDetails?.[0]
      const translatedError = detail
        ? t(`validator.${detail.code}`, detail.customState)
        : apiError.errorMessage
      setError(translatedError)
    }
    setLoading(false)
    clearInput()
  }

  return (
    <StyledMenu
      elevation={4}
      keepMounted
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuContent>
        <StyledInput type='file' accept='image/*' ref={inputRef} onChange={handleInputChanged} />

        <StyledMenuItem onClick={handleUploadPictureClicked}>
          <Publish />
          {t('uploadPicture')}
        </StyledMenuItem>

        {currentUser.pictureUrl && (
          <StyledMenuItem id='deleteMenuItem' onClick={handleRemovePictureClicked}>
            <DeleteOutline />
            {t('removePicture')}
          </StyledMenuItem>
        )}
      </MenuContent>
    </StyledMenu>
  )
}

export default ProfilePictureMenu
