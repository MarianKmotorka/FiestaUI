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

export type Validator = (
  value: any,
  t: Translate,
  form: UseFormMethods<Record<string, any>>
) => string | undefined
