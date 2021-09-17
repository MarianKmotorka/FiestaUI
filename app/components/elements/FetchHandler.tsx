import React, { FC } from 'react'
import { IApiError } from '@api/types'
import { CircularProgress } from '@material-ui/core'
import FetchError from './FetchError/FetchError'

interface IFetchHandlerProps {
  isLoading: boolean
  error: IApiError | null
  loadingComponent?: JSX.Element | JSX.Element[]
}

const FetchHandler: FC<IFetchHandlerProps> = ({ isLoading, loadingComponent, children, error }) => {
  if (isLoading) return loadingComponent || <CircularProgress />
  if (error) return <FetchError error={error} />
  return children as any
}

export default FetchHandler
