import { FC } from 'react'
import Router from 'next/router'
import { useAuth } from '@contextProviders/AuthProvider'

const AuthorizedPage: FC = ({ children }) => {
  const auth = useAuth()

  if (auth.isLoading) return <div>Authorizing...</div>

  if (!auth.isLoggedIn) {
    Router.replace(`/login?redirectedFrom=${Router.asPath}`)
    return <></>
  }

  return <>{children}</>
}

export default AuthorizedPage
