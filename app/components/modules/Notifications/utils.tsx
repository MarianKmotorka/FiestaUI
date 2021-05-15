import { ISkippedItemsResponse } from '@api/types'
import { ReactNode } from 'react'
import { InfiniteData, QueryClient } from 'react-query'
import { INotification, NotificationType } from './types'
import EventInvitationCreated from './variants/EventInvitationCreated'

export const getNotificationVariant = (notification: INotification<any>) => {
  const notificationMap: Record<NotificationType, ReactNode> = {
    [NotificationType.EventInvitationReply]: <div></div>,

    [NotificationType.EventInvitationCreated]: (
      <EventInvitationCreated notification={notification} />
    )
  }

  return notificationMap[notification.type]
}

export const addNotification = (queryClient: QueryClient, notification: INotification<any>) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    prev =>
      prev
        ? {
            ...prev,
            pages: prev.pages.map((page, pageIndex) => ({
              ...page,
              entries: pageIndex === 0 ? [notification, ...page.entries] : page.entries
            }))
          }
        : { pages: [], pageParams: [] }
  )
}

export const setNotificationSeen = (queryClient: QueryClient, id: number) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    prev =>
      prev
        ? {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              entries: page.entries.map(e => (e.id === id ? { ...e, seen: true } : e))
            }))
          }
        : { pages: [], pageParams: [] }
  )
}
