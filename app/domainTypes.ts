export interface ICurrentUser {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  nick: string
  pictureUrl?: string
  authProvider: AuthProviderFlags
  role: RoleEnum
  googleEmail?: string
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  fullName: string
  nick: string
  pictureUrl?: string
  bio?: string
}

export enum AuthProviderFlags {
  Google = 1,
  EmailAndPassword = 2,
  Facebook = 4
}

export enum RoleEnum {
  BasicUser = 1,
  PremiumUser = 2,
  Admin = 3
}

export enum AccessibilityTypeEnum {
  Public = 0,
  Private = 1,
  FriendsOnly = 2
}
