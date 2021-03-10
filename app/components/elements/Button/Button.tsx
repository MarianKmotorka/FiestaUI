import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import Spinner from '@elements/Spinner'

interface IButtonProps extends ButtonProps {
  loading?: boolean
}

const Button = ({ loading, children, variant, color, disabled, ...rest }: IButtonProps) => {
  return (
    <MuiButton
      {...rest}
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </MuiButton>
  )
}

export default Button
