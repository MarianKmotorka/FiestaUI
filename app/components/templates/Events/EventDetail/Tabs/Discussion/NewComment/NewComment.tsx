import { useState } from 'react'
import { Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import TextBox from '@elements/TextBox/TextBox'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { StyledAvatar } from '../Discussion.styled'

interface INewCommentProps {
  onSend: (text: string) => Promise<void>
}

const NewComment = ({ onSend }: INewCommentProps) => {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const { t } = useTranslation('common')
  const { currentUser } = useAuthorizedUser()
  const [showButtons, setShowButtons] = useState(false)

  const handleCancel = () => {
    setShowButtons(false)
    setText('')
  }

  const handleSent = async () => {
    setSending(true)
    await onSend(text)
    setSending(false)

    handleCancel()
  }

  return (
    <Box marginBottom='10px'>
      <Box display='flex' gridGap='15px'>
        <StyledAvatar src={currentUser.pictureUrl} />

        <TextBox
          value={text}
          onChange={setText}
          multiline
          fullWidth
          color='secondary'
          onFocus={() => setShowButtons(true)}
          placeholder={t('addComment') + '...'}
        />
      </Box>

      {showButtons && (
        <Box display='flex' justifyContent='flex-end' gridGap='10px' marginTop='5px'>
          <Button variant='text' color='secondary' onClick={handleCancel} disabled={sending}>
            {t('cancel').toUpperCase()}
          </Button>

          <Button disabled={!text} disableElevation onClick={handleSent} loading={sending}>
            {t('send').toUpperCase()}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default NewComment
