import { Navigate } from 'react-router-dom'
import { getCookie } from '../utils/helper/storage'

const isAuthenticated = () => {
  return !!getCookie('token')
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />
}
