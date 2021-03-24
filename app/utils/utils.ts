import { keys, pick } from 'lodash'
import { SubmitFormatter } from '@elements/HookForm/types'
import { AuthProviderFlags, ICurrentUser } from 'domainTypes'

export const IS_BROWSER = typeof window !== undefined

export const hasAuthProvider = ({ authProvider }: ICurrentUser, flag: AuthProviderFlags) => {
  return (authProvider & flag) === flag
}

export const isStringNumber = (value: any) => {
  return isNaN(Number(value)) === false
}

export const enumToKeyValueArray = (_enum: any) => {
  return Object.keys(_enum)
    .filter(x => !isStringNumber(x))
    .map(key => ({ key, value: _enum[key] }))
}

export const onlyDirtyValues: SubmitFormatter<any> = (values, { formState }) => {
  const dirtyKeys = keys(formState.dirtyFields)
  return pick(values, dirtyKeys)
}
