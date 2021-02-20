import useTranslation from 'next-translate/useTranslation'
import { Snackbar as MuiSnackbar } from '@material-ui/core'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

interface ISuccessSnackbarProps {
  onClose: () => void
  translationKey: string
  severity?: AlertProps['severity']
}

const Snackbar = ({ severity, translationKey, onClose }: ISuccessSnackbarProps) => {
  const { t } = useTranslation('common')

  return (
    <MuiSnackbar
      open
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={onClose} severity={severity || 'success'} variant='outlined' elevation={10}>
        {t(translationKey)}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
