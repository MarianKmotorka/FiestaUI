import DefaultLayout from '@layouts/DefaultLayout'
import ExploreTemplate from '@templates/Explore/ExploreTemplate'
import useTranslation from 'next-translate/useTranslation'

const Explore = () => {
  const { t } = useTranslation('common')

  return (
    <DefaultLayout title={`${t('explore')} • Fiesta`} disableNavbarHysteresis>
      <ExploreTemplate />
    </DefaultLayout>
  )
}

export default Explore
