import { Translate } from 'next-translate'
import { UseFormReturn } from 'react-hook-form'

export type Validator<TFormValues = any, TValue = any> = (
  value: TValue,
  t: Translate,
  form: UseFormReturn<TFormValues>
) => string | undefined

export type SubmitFormatter<T> = (values: T, form: UseFormReturn<T>) => Record<string, any>
