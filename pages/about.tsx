import Link from 'next/link'
import DefaultLayout from '@layouts/DefaultLayout'
import useT from 'next-translate/useTranslation'
import api from '../app/api/HttpClient'
import { Button, Input } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import { useAuth } from '@contextProviders/AuthProvider'

const Page1 = () => {
  const { t } = useT('about')
  const [img, setImg] = useState<File>()
  const { fetchUser } = useAuth()

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('profilePicture', img as Blob)

    const response = await api.put('/users/me/profile-picture', formData)
    console.log(response)
    if (response.status >= 300) return

    await fetchUser()
  }

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImg(file)
  }

  const deleteImage = async () => {
    const response = await api.delete('/users/me/profile-picture')
    console.log(response)
    if (response.status >= 300) return

    await fetchUser()
  }

  return (
    <DefaultLayout title='About'>
      <h1>{t('aboutTitle')}</h1>
      <h3>{t('common:hello')}</h3>
      <Link href='/'>Go Home</Link>
      <Button variant='contained' onClick={uploadImage}>
        UPLOAD
      </Button>

      <Input type='file' onChange={handleInputChanged} />

      <Button variant='contained' onClick={deleteImage}>
        DELETE
      </Button>
    </DefaultLayout>
  )
}

export default Page1
