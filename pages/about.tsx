import Link from 'next/link'
import DefaultLayout from '@layouts/DefaultLayout'
import useT from 'next-translate/useTranslation'
import { useDropzone } from 'react-dropzone'
import api from '../app/api/HttpClient'
import { Button, Input } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'

const url = `https://api.cloudinary.com/v1_1/fiestaplanner/image/upload`

const Page1 = () => {
  const { t } = useT('about')
  const [img, setImg] = useState<File>()

  const uploadImage = async () => {
    const response = await api.get('/auth/cloudinary-signature')
    if (response.status >= 300) return

    const { timestamp, signature } = response.data

    const formData = new FormData()
    formData.append('file', img as Blob)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)

    const res = await fetch(url, {
      method: 'post',
      body: formData
    })

    const data = await res.json()
    console.log(data)
  }

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImg(file)
  }

  return (
    <DefaultLayout>
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
