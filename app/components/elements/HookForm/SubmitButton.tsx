import { keys } from 'lodash'
import { useFormState } from 'react-hook-form'
import Button, { IButtonProps } from '@elements/Button/Button'

interface ISubmitButtonProps extends Omit<IButtonProps, 'type' | 'loading'> {}

const SubmitButton = (props: ISubmitButtonProps) => {
  const { isSubmitting, isDirty, errors } = useFormState()
  //TODO: isDirty not working

  const disabled = !isDirty || isSubmitting || keys(errors).length > 0

  return <Button {...props} type='submit' loading={isSubmitting} disabled={disabled} />
}

export default SubmitButton
