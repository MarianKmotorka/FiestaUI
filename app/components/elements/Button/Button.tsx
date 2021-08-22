import { ButtonProps, CircularProgress } from '@material-ui/core'
import Link from 'next/link'
import { StyledMuiButton } from './Button.styled'

export interface IButtonProps extends ButtonProps {
  loading?: boolean
}

const Button = ({
  loading,
  children,
  variant,
  color,
  disabled,
  startIcon,
  endIcon,
  href,
  ...rest
}: IButtonProps) => {
  const btn = (
    <StyledMuiButton
      {...rest}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size='1.3rem' /> : children}
    </StyledMuiButton>
  )

  return href ? <Link href={href}>{btn}</Link> : btn
}

export default Button
