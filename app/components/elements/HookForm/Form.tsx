import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import {
  useForm,
  FormProvider,
  UseFormMethods,
  DefaultValues,
  SubmitHandler
} from 'react-hook-form'
import { createSubmitHandler, ISubmitHandlerParameters } from '../../../utils/utils'

export type OnFormSubmit<T> = (
  values: T,
  submitHandler: (params: ISubmitHandlerParameters) => Promise<void>,
  form: UseFormMethods<T>
) => Promise<void>

interface IFormProps<T> {
  defaultValues: DefaultValues<T>
  onSubmit: OnFormSubmit<T>
  children: React.ReactNode | (({ submitting }: { submitting: boolean }) => React.ReactNode)
}

export default function Form<T>({
  defaultValues,
  children,
  onSubmit: initialOnSubmit
}: IFormProps<T>) {
  const { t } = useTranslation('common')
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<T>({
    mode: 'onTouched',
    defaultValues
  })

  const submitHandler = createSubmitHandler(form, t)

  const onSubmit = async (values: T) => {
    setSubmitting(true)
    await initialOnSubmit(values, submitHandler, form)
    setSubmitting(false)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<T>)}>
        {typeof children === 'function' ? children({ submitting }) : children}
      </form>
    </FormProvider>
  )
}
