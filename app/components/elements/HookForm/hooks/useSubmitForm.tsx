import { useState } from 'react'
import { IApiError } from 'types'
import { UseFormMethods } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import api from '@api/HttpClient'

export type SubmitFormatter<T> = (values: T, form: UseFormMethods<T>) => Record<string, any>
interface ISubmitFormParameters<TValues, TResponse> {
  url: string
  method?: 'post' | 'patch' | 'put' | 'delete'
  canSubmit?: boolean
  formatter?: SubmitFormatter<TValues>
  successCallback?: (data: TResponse, form: UseFormMethods<TValues>) => void
  errorCallback?: (error: IApiError['data'], form: UseFormMethods<TValues>) => void
}

export function useSubmitForm<TValues, TResponse = any>(
  params: ISubmitFormParameters<TValues, TResponse>
) {
  const { t } = useTranslation('common')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values: TValues, form: UseFormMethods<TValues>) => {
    const {
      url,
      canSubmit,
      method = 'post',
      formatter = x => x,
      successCallback,
      errorCallback
    } = params

    if (canSubmit === false) return

    setSubmitting(true)
    const data = formatter(values, form)
    const responsePromise =
      method === 'delete' ? api.delete(url, { params: data }) : api[method](url, data)

    try {
      const response = await responsePromise
      successCallback?.(response.data, form)
    } catch (err) {
      const errors = (err as IApiError).data.errorDetails

      errors.forEach(x => {
        const translatedError = t(`validator.${x.code}`, x.customState)
        form.setError(x.propertyName as any, { message: translatedError })
      })

      errorCallback?.((err as IApiError).data, form)
    }
    setSubmitting(false)
  }

  return { onSubmit, submitting }
}
