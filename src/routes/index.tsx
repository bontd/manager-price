import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AdminLayout from '@/layout/AdminLayout'
import AuthLayout from '@/layout/AuthLayout'
import Login from '@/pages/auth/login/Login'
import ProtectedRoute from '@/components/ProtectedRoute'
import NotFound from '@/pages/404'
import LoadingSpinner from '@/components/LoadingSpinner'
import { NAVIGATION_ITEMS } from '@/utils/constants/navigation'
import type { NavigationItem } from '@/utils/constants/navigation'
import ResetPassword from '@/pages/auth/reset-password'
import Register from '@/pages/auth/register'
import ResetPasswordVerify from '@/pages/auth/reset-password/verify'
import { getUserInfo } from '@/utils/helper/storage'
import { ROLE } from '@/utils/constants/enum'
import { roleStringToEnum } from '@/utils/constants/navigation'

// Lazy load components
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const Users = lazy(() => import('@/pages/users'))
const ExpenseCategories = lazy(() => import('@/pages/expense-categories'))
const Expenses = lazy(() => import('@/pages/expenses'))

// Helper to flatten navigation items to get all items with a path
function flattenNavigationItems(items: NavigationItem[]): NavigationItem[] {
  let result: NavigationItem[] = [];
  for (const item of items) {
    if (item.path) {
      result.push(item);
    }
    if (item.children) {
      result = result.concat(flattenNavigationItems(item.children));
    }
  }
  return result;
}

const flatNavItems = flattenNavigationItems(NAVIGATION_ITEMS);

const userInfo = getUserInfo();
const userRole = userInfo?.role;

const adminRoutes = flatNavItems
  .filter(item => {
    if (!item.allowedRoles) return true;
    const allowedEnumRoles = item.allowedRoles.map(roleStringToEnum);
    return userRole && allowedEnumRoles.includes(userRole);
  })
  .map(item => ({
    path: item.path,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        {item.path === '/' && <Dashboard />}
        {item.path === '/users' && <Users />}
        {item.path === '/expense-categories' && <ExpenseCategories />}
        {item.path === '/quizzes' && <Users />}
        {item.path === '/expenses' && <Expenses />}
      </Suspense>
    )
  }));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: adminRoutes,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/register', element: <Register /> },
      { path: `/reset-password/:token`, element: <ResetPasswordVerify /> },
    ],
  },
  { path: '*', element: <NotFound /> }
])