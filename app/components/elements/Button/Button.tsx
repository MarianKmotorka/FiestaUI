import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import { Spinner } from './Button.styled'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

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
      {loading ? <Spinner spin icon={faCompactDisc} /> : children}
    </MuiButton>
  )
}

export default Button
