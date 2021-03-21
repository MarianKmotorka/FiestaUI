import { AccordionSummary } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import Spinner from '@elements/Spinner'

import { Wrapper } from './EditProfileTab.styled'
import { AccordionTitle, SettingsAccordion } from '../common.styled'

const LoadingAccordion = () => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <SettingsAccordion>
        <AccordionSummary expandIcon={<Spinner />}>
          <AccordionTitle>{t('editProfile')}</AccordionTitle>
        </AccordionSummary>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default LoadingAccordion
