import { Translate } from 'next-translate'
import { UseFormMethods } from 'react-hook-form'

interface IApiErrorDetail {
  code: string
  customState: any
  propertyName: string
}

export interface IApiError {
  response: {
    data: {
      errorCode: string
      errorMessage: string
      errorDetails: IApiErrorDetail[]
    }
  }
}

export type Validator<TFormValues = any, TValue = any> = (
  value: TValue,
  t: Translate,
  form: UseFormMethods<TFormValues>
) => string | undefined
