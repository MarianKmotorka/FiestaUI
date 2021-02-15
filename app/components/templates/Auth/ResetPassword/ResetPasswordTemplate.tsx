import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CardContent, Modal } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { ArrowForward, KeyboardArrowRight } from '@material-ui/icons'

import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { repeatPasswordValidator } from './validators'
import Form, { OnFormSubmit } from '@elements/HookForm/Form'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'

import { StyledCard, SuccessResetDialogCard } from './ResetPasswordTemplate.styled'

export interface IFormValues {
  newPassword: string
  repeatPassword: string
}

const defaultValues: IFormValues = {
  newPassword: '',
  repeatPassword: ''
}

const ResetPasswordTemplate = () => {
  const { t } = useTranslation('common')
  const { query } = useRouter()
  const [success, setSuccess] = useState(false)

  const handleSubmitted: OnFormSubmit<IFormValues> = async ({ newPassword }, submit) => {
    await submit({
      data: {
        newPassword,
        email: query.email,
        token: query.token
      },
      url: '/auth/reset-password',
      successCallback: () => setSuccess(true),
      errorCallback: err => {
        if (err.errorDetails.length === 0)
          alert('Something went wrong: ' + JSON.stringify(err, null, 2))
      }
    })
  }

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <h1>{t('setUpNewPassword')}</h1>

        <Form defaultValues={defaultValues} onSubmit={handleSubmitted}>
          {({ submitting }) => (
            <>
              <FormInput
                fullWidth
                type='password'
                color='secondary'
                name='newPassword'
                variant='outlined'
                label={t('newPassword')}
              />

              <FormInput
                fullWidth
                type='password'
                color='secondary'
                variant='outlined'
                name='repeatPassword'
                label={t('repeatPassword')}
                validate={repeatPasswordValidator}
              />

              <Button
                size='large'
                type='submit'
                loading={submitting}
                endIcon={<KeyboardArrowRight />}
              >
                {t('submit')}
              </Button>
            </>
          )}
        </Form>
      </StyledCard>

      <Modal open={success}>
        <SuccessResetDialogCard>
          <CardContent>
            <h1>{t('success')}</h1>

            <Link href='/login'>
              <Button endIcon={<ArrowForward />}>{t('login')}</Button>
            </Link>
          </CardContent>
        </SuccessResetDialogCard>
      </Modal>
    </PageMinHeightWrapper>
  )
}

export default ResetPasswordTemplate
