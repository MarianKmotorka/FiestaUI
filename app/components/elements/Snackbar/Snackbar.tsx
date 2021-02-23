import useTranslation from 'next-translate/useTranslation'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import { StyledSnackBar } from './Snackbar.styled'

interface ISuccessSnackbarProps {
  onClose: () => void
  translationKey: string
  severity?: AlertProps['severity']
}

const Snackbar = ({ severity, translationKey, onClose }: ISuccessSnackbarProps) => {
  const { t } = useTranslation('common')

  return (
    <StyledSnackBar
      open
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={onClose} severity={severity || 'success'} variant='outlined' elevation={10}>
        {t(translationKey)}
      </Alert>
    </StyledSnackBar>
  )
}

export default Snackbar
