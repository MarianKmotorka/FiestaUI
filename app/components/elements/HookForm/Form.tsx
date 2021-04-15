import { isFunction } from 'lodash'
import { ReactNode, useEffect } from 'react'
import {
  useForm,
  FormProvider,
  UseFormMethods,
  DefaultValues,
  SubmitHandler
} from 'react-hook-form'

export interface IFormProps<T> {
  children: ReactNode | ((form: UseFormMethods<T>) => ReactNode)
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
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<T>)}>
        {isFunction(children) ? children(form) : children}
      </form>
    </FormProvider>
  )
}
