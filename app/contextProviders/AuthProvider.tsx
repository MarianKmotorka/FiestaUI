import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { IUser } from 'domainTypes'
import * as authService from 'services/authService'

export const IS_SIGNED_IN_LOCAL_STORAGE_KEY = 'FIESTA.is_signed_in'

type IAuthContextValue =
  | {
      isLoggedIn: false
      isLoading: boolean
      fetchUser: () => Promise<void>
    }
  | {
      isLoggedIn: true
      isLoading: boolean
      currentUser: IUser
      logout: () => Promise<void>
      fetchUser: () => Promise<void>
    }

const AuthContext = createContext<IAuthContextValue>(null!)
export const useAuth = () => useContext(AuthContext)

export const useAuthorizedUser = () => {
  const auth = useAuth()

  if (!auth.isLoggedIn) throw new Error('This hook must be used only for authorized pages.')

  return {
    currentUser: auth.currentUser,
    isLoading: auth.isLoading,
    logout: auth.logout
  }
}

const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<IUser>()

  const fetchUser = useCallback(async () => {
    setLoading(true)

    const user = await authService.fetchCurrentUser()
    if (user) {
      setUser(user)
      localStorage.setItem(IS_SIGNED_IN_LOCAL_STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(IS_SIGNED_IN_LOCAL_STORAGE_KEY)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const initialLoad = async () => {
      if (localStorage.getItem(IS_SIGNED_IN_LOCAL_STORAGE_KEY)) {
        await fetchUser()
      }
      setLoading(false)
    }

    initialLoad()
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    localStorage.removeItem(IS_SIGNED_IN_LOCAL_STORAGE_KEY)
    setUser(undefined)
  }, [])

  const value: IAuthContextValue = user
    ? {
        currentUser: user,
        isLoggedIn: true,
        isLoading: loading,
        fetchUser,
        logout
      }
    : {
        isLoggedIn: false,
        isLoading: loading,
        fetchUser
      }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
