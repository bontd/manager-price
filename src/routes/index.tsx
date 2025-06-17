import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '@/layout/AdminLayout'
import AuthLayout from '@/layout/AuthLayout'
import Login from '@/pages/login/Login'
import Dashboard from '@/pages/dashboard/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/user', element: 'user' },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
    ],
  },
])