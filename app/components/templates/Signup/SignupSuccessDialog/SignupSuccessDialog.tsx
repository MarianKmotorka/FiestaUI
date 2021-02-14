import { CardContent, Modal } from '@material-ui/core'
import Link from 'next/link'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'

import { StyledCard, Title } from './SignupSuccessDialog.styled'

interface ISignupSuccessDialogProps {
  email: string
}

const SignupSuccessDialog = ({ email }: ISignupSuccessDialogProps) => {
  const { t } = useTranslation('common')

  return (
    <Modal open>
      <StyledCard elevation={0}>
        <CardContent>
          <Title>{t('success')}</Title>

          <Trans
            i18nKey='common:confirmationEmailWillBeSentTo'
            values={{ email }}
            components={[<p />, <b />]}
          />

          <Link href='/login'>
            <Button>{t('login')}</Button>
          </Link>
        </CardContent>
      </StyledCard>
    </Modal>
  )
}

export default SignupSuccessDialog