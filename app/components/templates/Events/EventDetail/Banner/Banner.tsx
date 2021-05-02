import { ChangeEvent, useRef, useState } from 'react'
import { Publish } from '@material-ui/icons'
import { useQueryClient } from 'react-query'
import { Box, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IEventDetail } from '../EventDetailTemplate'
import { apiErrorToast, successToast } from 'services/toastService'
import { Image, ImageWrapper, Overlay, Wrapper } from './Banner.styled'

interface IBannerProps {
  src: string
  eventId: string
  canUpload: boolean
}

const Banner = ({ src, canUpload, eventId }: IBannerProps) => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')

  const handleInputChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('banner', file as Blob)

    try {
      setLoading(true)
      const { data } = await api.post(`/events/${eventId}/banner`, formData)
      queryClient.setQueryData<IEventDetail>(['events', eventId], prev => ({
        ...prev,
        ...data
      }))
      successToast(t('saved'))
    } catch (error) {
      apiErrorToast(error, t)
    }
    setLoading(false)
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={src} />

        {canUpload && (
          <Overlay opacity={loading ? 1 : 0} onClick={() => inputRef.current.click()}>
            {loading ? <CircularProgress /> : <Publish />}
          </Overlay>
        )}
      </ImageWrapper>

      <Box display='none'>
        <input
          value=''
          type='file'
          accept='image/*'
          ref={inputRef}
          disabled={loading}
          onChange={handleInputChanged}
        />
      </Box>
    </Wrapper>
  )
}

export default Banner
