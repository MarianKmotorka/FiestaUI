import Link from 'next/link'
import DefaultLayout from '@layouts/DefaultLayout'
import useT from 'next-translate/useTranslation'
import api from '../app/api/HttpClient'
import { Button, Input } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'

const Page1 = () => {
  const { t } = useT('about')
  const [img, setImg] = useState<File>()

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('profilePicture', img as Blob)

    const response = await api.put('/users/me', formData)
    if (response.status >= 300) return

    const data = await response.data.json()
    console.log(data)
  }

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImg(file)
  }

  return (
    <DefaultLayout title='About'>
      <h1>{t('aboutTitle')}</h1>
      <h3>{t('common:hello')}</h3>
      <Link href='/'>Go Home</Link>
      <Button variant='contained' onClick={uploadImage}>
        DO SOME SHIT
      </Button>

      <Input type='file' onChange={handleInputChanged} />
    </DefaultLayout>
  )
}

export default Page1
