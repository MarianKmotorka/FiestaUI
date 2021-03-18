import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import Spinner from '@elements/Spinner'

interface IButtonProps extends ButtonProps {
  loading?: boolean
  themedSpinner?: boolean
}

const Button = ({
  loading,
  children,
  variant,
  color,
  disabled,
  themedSpinner,
  ...rest
}: IButtonProps) => {
  return (
    <MuiButton
      {...rest}
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled || loading}
    >
      {loading ? <Spinner themed={themedSpinner ?? true} /> : children}
    </MuiButton>
  )
}

export default Button
