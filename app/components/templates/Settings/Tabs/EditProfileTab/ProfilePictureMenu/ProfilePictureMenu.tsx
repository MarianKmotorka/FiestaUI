import { useRef, ChangeEvent } from 'react'
import { useQueryClient } from 'react-query'
import { DeleteOutline, Publish } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IUserDetail } from 'domainTypes'
import { Menu } from '@elements/Menu/Menu'
import { getErrorMessage } from '@utils/utils'
import { errorToast, successToast } from 'services/toastService'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { StyledInput, StyledMenuItem } from './ProfilePictureMenu.styled'

interface IProfilePictureMenuProps {
  anchorEl?: HTMLElement
  setLoading: (loading: boolean) => void
  onClose: () => void
}

const ProfilePictureMenu = ({ anchorEl, onClose, setLoading }: IProfilePictureMenuProps) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  const inputRef = useRef<HTMLInputElement>(null!)
  const { updateUser, currentUser } = useAuthorizedUser()

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
      queryClient.setQueryData<IUserDetail>(['users', currentUser.id], prev => ({
        ...prev!,
        pictureUrl: undefined
      }))
      successToast(t('saved'))
    } catch (error) {
      errorToast(getErrorMessage(error, t))
    }
    setLoading(false)
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
      queryClient.setQueryData<IUserDetail>(['users', currentUser.id], prev => ({
        ...prev,
        ...data
      }))
      successToast(t('saved'))
    } catch (error) {
      errorToast(getErrorMessage(error, t))
    }
    setLoading(false)
  }

  return (
    <Menu
      elevation={4}
      keepMounted
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
      transformOrigin={{ horizontal: 'center', vertical: 'center' }}
    >
      <>
        <StyledInput
          value=''
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleInputChanged}
        />

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
      </>
    </Menu>
  )
}

export default ProfilePictureMenu
