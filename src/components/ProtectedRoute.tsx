import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
  return !!localStorage.getItem('token') // tuỳ vào cách bạn xử lý auth
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />
}
