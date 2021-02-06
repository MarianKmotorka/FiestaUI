import { useState } from 'react'
import { useForm, FormProvider, UseFormMethods, DefaultValues } from 'react-hook-form'

export type OnFormSubmit<T> = (values: DefaultValues<T>, form: UseFormMethods<T>) => Promise<void>

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
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<T>({
    mode: 'onBlur',
    defaultValues
  })

  const onSubmit = async (values: DefaultValues<T>) => {
    setSubmitting(true)
    await initialOnSubmit(values, form)
    setSubmitting(false)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {typeof children === 'function' ? children({ submitting }) : children}
      </form>
    </FormProvider>
  )
}
