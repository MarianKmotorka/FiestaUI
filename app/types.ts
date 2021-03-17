import { Translate } from 'next-translate'
import { UseFormMethods } from 'react-hook-form'

interface IApiErrorDetail {
  code: string
  customState: any
  propertyName: string
}

export interface IApiError {
  data: {
    errorCode: string
    errorMessage: string
    errorDetails: IApiErrorDetail[]
  }
  status: number
}

export type Validator<TFormValues = any, TValue = any> = (
  value: TValue,
  t: Translate,
  form: UseFormMethods<TFormValues>
) => string | undefined
