import { useState } from 'react'
import { CardContent, Modal } from '@material-ui/core'
import { KeyboardArrowRight, Done } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'

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

    // Note: simulates api call delay
    await new Promise(res => setTimeout(res, 3000))

    setState('sent')
  }

  return (
    <Modal open onClose={onClose}>
      <StyledCard elevation={0}>
        <CardContent>
          <Title>{t('login:confirmYourEmail')}</Title>

          <Trans
            i18nKey='login:confirmationEmailWillBeSentTo'
            values={{ email }}
            components={[<p />, <b />]}
          />

          <Button
            onClick={handleSent}
            endIcon={state === 'sent' ? <Done /> : <KeyboardArrowRight />}
            loading={state === 'sending'}
          >
            {state === 'sent' ? t('success') : t('send')}
          </Button>
        </CardContent>
      </StyledCard>
    </Modal>
  )
}

export default ConfirmEmailDialog
