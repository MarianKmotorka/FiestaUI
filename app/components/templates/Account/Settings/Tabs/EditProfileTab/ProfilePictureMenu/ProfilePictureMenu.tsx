import { DeleteOutline, Publish } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { useRef, ChangeEvent } from 'react'

import api from '@api/HttpClient'
import { IApiError } from '../../../../../../../types'
import { useAuth } from '@contextProviders/AuthProvider'

import { MenuContent, StyledInput, StyledMenu, StyledMenuItem } from './ProfilePictureMenu.styled'

interface IProfilePictureMenuProps {
  anchorEl?: HTMLElement
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  onClose: () => void
}

const ProfilePictureMenu = ({
  anchorEl,
  onClose,
  setLoading,
  setError
}: IProfilePictureMenuProps) => {
  const { t } = useTranslation('common')
  const inputRef = useRef<HTMLInputElement>(null!)
  const { fetchUser } = useAuth()

  const onInputFile = () => {
    if (inputRef.current != null) {
      onClose()
      inputRef.current.click()
    }
  }

  const onRemovePicture = async () => {
    try {
      setLoading(true)
      onClose()
      await api.delete('/users/me/profile-picture')
      await fetchUser()
    } catch (error) {
      const errors = (error as IApiError).response.data.errorDetails
      setError(errors?.[0]?.code)
    }
    setLoading(false)
  }

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    file && uploadImage(file)
  }

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('profilePicture', file as Blob)

    try {
      setLoading(true)
      await api.put('/users/me/profile-picture', formData)
      await fetchUser()
    } catch (error) {
      const errors = (error as IApiError).response.data.errorDetails
      const translatedError = t(`validator.${errors?.[0]?.code}`, errors?.[0]?.customState)
      setError(translatedError)
    }
    setLoading(false)
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

        <StyledMenuItem onClick={onInputFile}>
          <Publish />
          {t('uploadPicture')}
        </StyledMenuItem>

        <StyledMenuItem onClick={onRemovePicture}>
          <DeleteOutline />
          {t('removePicture')}
        </StyledMenuItem>
      </MenuContent>
    </StyledMenu>
  )
}

export default ProfilePictureMenu
