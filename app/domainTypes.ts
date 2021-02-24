export interface IUser {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  pictureUrl?: string
  authProvider: AuthProviderFlags
  role: RoleEnum
  googleEmail?: string
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
