import { ParsedUrlQuery } from 'querystring'

export const IS_BROWSER = typeof window !== undefined

export const getReturnUrlFromQuery = (query: ParsedUrlQuery) => {
  try {
    const returnUrl = JSON.parse(query.state as string).returnUrl
    if (returnUrl) return returnUrl as string
  } catch (err) {
    return undefined
  }
}
