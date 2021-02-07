import { Button as MuiButton, ButtonTypeMap, ButtonProps } from '@material-ui/core'
import { Spinner } from './Button.styled'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

interface IButtonProps extends ButtonProps {
  loading?: boolean
}

const Button = ({ loading, children, variant, color, ...rest }: IButtonProps) => {
  return (
    <MuiButton {...rest} variant={variant || 'contained'} color={color || 'primary'}>
      {loading ? <Spinner spin icon={faCompactDisc} /> : children}
    </MuiButton>
  )
}

export default Button
