import axios from 'axios'
import Router from 'next/router'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { IS_SIGNED_IN_LOCAL_STORAGE_KEY } from '../contextProviders/AuthProvider'

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_USE_PROXY === 'true' && typeof window === 'object'
      ? `${window.location.origin}/api`
      : process.env.NEXT_PUBLIC_API_BASE_URL
})

createAuthRefreshInterceptor(client, failedRequest =>
  client
    .get(window.location.origin + '/api/refresh-token')
    .then(resp => {
      const { accessToken } = resp.data
      setAuthHeader(accessToken)
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
      return Promise.resolve()
    })
    .catch(_ => {
      localStorage.removeItem(IS_SIGNED_IN_LOCAL_STORAGE_KEY)
      window.location.assign(`/login?redirectedFrom=${Router.asPath}`)
    })
)

//Note: Keep this line bellow "createAuthRefreshInterceptor()" since it needs entire error object being returned
client.interceptors.response.use(undefined, error => Promise.reject(error.response))

export const setAuthHeader = (accessToken?: string) => {
  client.defaults.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : ''
}

export default client
