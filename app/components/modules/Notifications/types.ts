export enum NotificationType {
  EventInvitationReply = 1,
  EventInvitationCreated = 2
}

export interface INotification<TModel> {
  id: number
  seen: boolean
  createdAt: string
  type: NotificationType
  model: TModel
}
