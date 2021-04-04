import { useEffect } from 'react'
import { useForm, FormProvider, UseFormReturn, DefaultValues, SubmitHandler } from 'react-hook-form'

export interface IFormProps<T> {
  children: React.ReactNode
  defaultValues: DefaultValues<T>
  onSubmit: (values: T, form: UseFormReturn<T>) => Promise<void>
}

export default function Form<T>({
  defaultValues,
  children,
  onSubmit: initialOnSubmit
}: IFormProps<T>) {
  const form = useForm<T>({
    mode: 'onTouched',
    defaultValues
  })

  //Note: Fixes form still dirty when typing in same value as initial
  useEffect(() => {
    form.reset(form.getValues() as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: T) => {
    await initialOnSubmit(values, form)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<T>)}>{children}</form>
    </FormProvider>
  )
}
