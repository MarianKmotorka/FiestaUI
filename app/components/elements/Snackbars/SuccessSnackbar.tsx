import useTranslation from 'next-translate/useTranslation'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

interface ISuccessSnackbarProps {
  onClose: () => void
}

const SuccessSnackbar = ({ onClose }: ISuccessSnackbarProps) => {
  const { t } = useTranslation('common')

  return (
    <Snackbar open autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity='success'>
        {t(`success`)}
      </Alert>
    </Snackbar>
  )
}

export default SuccessSnackbar
