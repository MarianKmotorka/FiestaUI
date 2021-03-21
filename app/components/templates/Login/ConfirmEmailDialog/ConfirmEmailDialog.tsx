import { useState } from 'react'
import Trans from 'next-translate/Trans'
import { CardContent } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { KeyboardArrowRight, Done } from '@material-ui/icons'

import api from '@api/HttpClient'
import Modal from '@elements/Modal'
import Button from '@elements/Button/Button'

import { StyledCard, Title } from './ConfirmEmailDialog.styled'

interface IConfirmEmailDialogProps {
  email: string
  onClose: () => void
}

type SendingState = 'notSent' | 'sending' | 'sent'

const ConfirmEmailDialog = ({ email, onClose }: IConfirmEmailDialogProps) => {
  const { t } = useTranslation('common')
  const [state, setState] = useState<SendingState>('notSent')

  const handleSent = async () => {
    if (state === 'sent') return

    setState('sending')
    await api.post('/auth/send-verification-email', { email })
    setState('sent')
  }

  return (
    <Modal open onClose={onClose}>
      <StyledCard elevation={0}>
        <CardContent>
          <Title>{t('login:confirmYourEmail')}</Title>

          <Trans
            i18nKey='common:confirmationEmailWillBeSentTo'
            values={{ email }}
            components={[<p key='0' />, <b key='1' />]}
          />

          <Button
            onClick={handleSent}
            loading={state === 'sending'}
            endIcon={state === 'sent' ? <Done /> : <KeyboardArrowRight />}
          >
            {state === 'sent' ? t('success') : t('send')}
          </Button>
        </CardContent>
      </StyledCard>
    </Modal>
  )
}

export default ConfirmEmailDialog
