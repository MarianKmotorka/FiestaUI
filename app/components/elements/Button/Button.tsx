import { Button as MuiButton, ButtonProps, CircularProgress } from '@material-ui/core'

export interface IButtonProps extends ButtonProps {
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
      {loading ? <CircularProgress size='1.3rem' /> : children}
    </MuiButton>
  )
}

export default Button
