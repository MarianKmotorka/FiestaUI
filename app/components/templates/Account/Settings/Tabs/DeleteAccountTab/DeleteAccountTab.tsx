import { useState } from 'react'
import { useRouter } from 'next/router'
import { Warning, ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags } from 'domainTypes'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import DeleteWithPassword from './DeleteWithPassword'
import DeleteAccountWithGoogle from './DeleteAccountWithGoogle'

import { InfoText, Title, Wrapper } from './DeleteAccountTab.styled'

const DeleteAccountTab = () => {
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
          <Title>{t('deleteWithpassword')}</Title>
        </AccordionSummary>

        <AccordionDetails>
          {hasPassword ? (
            <DeleteWithPassword />
          ) : (
            <InfoText>
              <Warning />
              {t('deleteWithpasswordNotAccessible')}
            </InfoText>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={googleExpanded} onChange={(_, value) => setGoogleExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Title>{t('deleteWithGoogle')}</Title>
        </AccordionSummary>

        <AccordionDetails>
          {hasGoogleAccount ? (
            <DeleteAccountWithGoogle />
          ) : (
            <InfoText>
              <Warning />
              {t('deleteWithGoogleNotAccessible')}
            </InfoText>
          )}
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  )
}

export default DeleteAccountTab
