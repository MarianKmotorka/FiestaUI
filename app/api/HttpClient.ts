import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { IS_SIGNED_IN_LOCAL_STORAGE_KEY } from '../contextProviders/AuthProvider'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

client.interceptors.request.use(undefined, error => Promise.reject(error))

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
      window.location.assign('/') // LOGIN LOCATION
    })
)

export const setAuthHeader = (accessToken?: string) => {
  client.defaults.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : ''
}

export default client
