import {
  useForm,
  FormProvider,
  UseFormMethods,
  DefaultValues,
  SubmitHandler
} from 'react-hook-form'

export interface IFormProps<T> {
  children: React.ReactNode
  defaultValues: DefaultValues<T>
  onSubmit: (values: T, form: UseFormMethods<T>) => Promise<void>
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

  const onSubmit = async (values: T) => {
    await initialOnSubmit(values, form)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<T>)}>{children}</form>
    </FormProvider>
  )
}
