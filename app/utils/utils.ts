import { UseFormMethods } from 'react-hook-form'
import { Translate } from 'next-translate'

import { IApiError } from 'types'
import api from '@api/HttpClient'
import { AuthProviderFlags, IUser } from 'domainTypes'

export const IS_BROWSER = typeof window !== undefined

export interface ISubmitHandlerParameters {
  data: Record<string, any>
  url: string
  params?: Record<string, any>
  method?: 'post' | 'patch' | 'put' | 'delete'
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

  const responsePromise =
    method === 'delete'
      ? api.delete(url, { params: { ...data, ...params } })
      : api[method](url, data, { params })

  try {
    const response = await responsePromise
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
