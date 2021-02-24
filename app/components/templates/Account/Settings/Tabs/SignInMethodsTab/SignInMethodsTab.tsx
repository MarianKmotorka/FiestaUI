import { useState } from 'react'
import { useRouter } from 'next/router'
import { Done, ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@material-ui/core'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags } from 'domainTypes'
import AddPasswordForm from './AddPasswordForm'
import ConnectGoogleAccount from './ConnectGoogleAccount'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { InfoText, Title, Wrapper } from './SignInMethodsTab.styled'

const SignInMethodsTab = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { currentUser } = useAuthorizedUser()
  const [googleExpanded, setGoogleExpanded] = useState(!!query.code)

  const hasPassword = hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword)
  const hasGoogleAccount = hasAuthProvider(currentUser, AuthProviderFlags.Google)

  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Title>{t('emailAndPasswordSignIn')}</Title>
        </AccordionSummary>

        <AccordionDetails>
          {hasPassword ? (
            <InfoText>
              {t('passwordSignInIsSetUp')} <Done />
            </InfoText>
          ) : (
            <AddPasswordForm />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={googleExpanded} onChange={(_, value) => setGoogleExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Title>{t('googleAccountSignIn')}</Title>
        </AccordionSummary>

        <AccordionDetails>
          {hasGoogleAccount ? (
            <InfoText>
              <Chip label={currentUser.googleEmail} />
              {t('googleAccountConnected')} <Done />
            </InfoText>
          ) : (
            <ConnectGoogleAccount />
          )}
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  )
}

export default SignInMethodsTab