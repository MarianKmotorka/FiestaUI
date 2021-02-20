import { ParsedUrlQuery } from 'querystring'
import { UseFormMethods } from 'react-hook-form'
import { Translate } from 'next-translate'

import { IApiError } from 'types'
import api from '@api/HttpClient'
import { AuthProviderFlags, IUser } from 'domainTypes'

export const IS_BROWSER = typeof window !== undefined

export const getReturnUrlFromQuery = (query: ParsedUrlQuery) => {
  try {
    const returnUrl = JSON.parse(query.state as string).returnUrl
    if (returnUrl) return returnUrl as string
  } catch (err) {
    return undefined
  }
}

export interface ISubmitHandlerParameters {
  data: any
  url: string
  params?: Record<string, any>
  method?: 'post' | 'patch' | 'put'
  successCallback?: <TResponse>(data: TResponse) => void
  errorCallback?: (error: IApiError['response']['data']) => void
}

export const createSubmitHandler = ({ setError }: UseFormMethods<any>, t: Translate) => async ({
  url,
  method: initialMethod,
  data,
  params,
  errorCallback,
  successCallback
}: ISubmitHandlerParameters) => {
  const method = initialMethod || 'post'

  try {
    const response = await api[method](url, data, { params })
    successCallback?.(response.data)
  } catch (err) {
    const errors = (err as IApiError).response.data.errorDetails

    errors.forEach(x => {
      const translatedError = t(`validator.${x.code}`, x.customState)
      setError(x.propertyName, { message: translatedError })
    })

    errorCallback?.((err as IApiError).response.data)
  }
}

export const hasAuthProvider = ({ authProvider }: IUser, flag: AuthProviderFlags) => {
  return (authProvider & flag) === flag
}
