import { useFormContext } from 'react-hook-form'
import Button, { IButtonProps } from '@elements/Button/Button'

interface ISubmitButtonProps extends Omit<IButtonProps, 'type' | 'loading'> {}

const SubmitButton = (props: ISubmitButtonProps) => {
  const {
    formState: { isSubmitting, isDirty, isValid }
  } = useFormContext()

  const disabled = !isDirty || isSubmitting || !isValid

  return <Button {...props} type='submit' loading={isSubmitting} disabled={disabled} />
}

export default SubmitButton
