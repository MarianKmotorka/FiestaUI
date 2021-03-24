import useTranslation from 'next-translate/useTranslation'
import { IApiError } from '@api/types'
import { Wrapper } from './FetchError.styled'

interface IFetchErrorProps {
  error: IApiError
}

const FetchError = ({ error }: IFetchErrorProps) => {
  const { t } = useTranslation('common')

  const getErrorMessage = () => {
    switch (error.status) {
      case 404:
        return 'notFound'
      case 403:
        return 'notAuthorized'
      default:
        return 'unexpectedErrorOccuredWhileLoadingData'
    }
  }

  return (
    <Wrapper>
      <h3>{t(getErrorMessage())}</h3>
    </Wrapper>
  )
}

export default FetchError
