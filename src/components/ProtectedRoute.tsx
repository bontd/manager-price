import { Navigate } from 'react-router-dom'
import { getToken, getRefreshToken } from '../utils/helper/storage'
import tokenManager from '../utils/helper/tokenManager'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

const isAuthenticated = () => {
  return !!getToken()
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      let token = getToken()
      if (!token) {
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          token = await tokenManager.refreshToken() || undefined
        }
      }
      setIsAuth(!!token)
      setAuthChecked(true)
    }
    checkAuth()
  }, [])

  if (!authChecked) return <LoadingSpinner tip="Đang xác thực..." />
  return isAuth ? <>{children}</> : <Navigate to="/login" />
}
