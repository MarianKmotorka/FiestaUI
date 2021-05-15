import { isEmpty } from 'lodash'
import { NotificationsTwoTone } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Box, CircularProgress, PopoverOrigin, Typography } from '@material-ui/core'

import Observer from '@elements/Observer'
import { getErrorMessage } from '@utils/utils'
import { useNotifications } from './NotificationsProvider'

import { getNotificationVariant } from './utils'
import { StyledMenu } from './Notifications.styled'

interface INotificationsProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const origins: {
  anchorOrigin: PopoverOrigin
  transformOrigin: PopoverOrigin
} = {
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  transformOrigin: { horizontal: 'center', vertical: 'top' }
}

const Notifications = ({ anchorEl, onClose }: INotificationsProps) => {
  const { notifications, isLoading, error, hasMore, loadMore } = useNotifications()
  const { t } = useTranslation('common')

  return (
    <StyledMenu
      open
      elevation={4}
      anchorEl={anchorEl}
      onClose={onClose}
      getContentAnchorEl={null}
      {...origins}
    >
      <Box
        padding='15px 20px'
        color='themeText.themeGray'
        display='flex'
        gridGap='5px'
        alignItems='center'
      >
        <NotificationsTwoTone />
        <Typography variant='h6'>{t('notifications')}</Typography>
      </Box>

      {!isLoading && !error && isEmpty(notifications) && (
        <Box padding='15px 20px' color='themeText.themeBlack'>
          <Typography variant='body2'>{t('noNotifications')}</Typography>
        </Box>
      )}

      {error && (
        <Typography variant='body1' color='error'>
          {getErrorMessage(error, t)}
        </Typography>
      )}

      {notifications && notifications.map(x => <div key={x.id}>{getNotificationVariant(x)}</div>)}

      {isLoading && (
        <Box margin='15px 20px'>
          <CircularProgress />
        </Box>
      )}

      <Observer callback={loadMore} disabled={isLoading || !hasMore} />
    </StyledMenu>
  )
}

export default Notifications
