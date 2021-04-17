import useTranslation from 'next-translate/useTranslation'
import { ErrorOutlineOutlined, LockTwoTone, Search } from '@material-ui/icons'
import { IApiError } from '@api/types'
import { ErrorCard } from './FetchError.styled'

interface IFetchErrorProps {
  error: IApiError
}

const FetchError = ({ error }: IFetchErrorProps) => {
  const { t } = useTranslation('common')

  const getErrorTitle = () => {
    switch (error.status) {
      case 404:
        return 'notFound'
      case 403:
        return 'notAuthorized'
      default:
        return 'unexpectedErrorOccuredWhileLoadingData'
    }
  }

  const getErrorMessage = () => {
    switch (error.status) {
      case 404:
        return 'resourceDoesNotExistOrHasBeenDeleted'
      case 403:
        return 'youDontHaveSufficentPermissionsToAccessThisResource'
      default:
        return undefined
    }
  }

  const getErrorIcon = () => {
    switch (error.status) {
      case 404:
        return <Search fontSize='large' />
      case 403:
        return <LockTwoTone fontSize='large' />
      default:
        return <ErrorOutlineOutlined fontSize='large' />
    }
  }

  const errorMessage = getErrorMessage()

  return (
    <ErrorCard>
      {getErrorIcon()}
      <h3>{t(getErrorTitle())}</h3>
      {errorMessage && <p>{t(errorMessage)}</p>}
    </ErrorCard>
  )
}

export default FetchError
