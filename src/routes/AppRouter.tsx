import { useUserProfileStore } from '@/stores/useUserProfile';
import { roleStringToEnum, NAVIGATION_ITEMS } from '@/utils/constants/navigation';
import { ROLE } from '@/utils/constants/enum';
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from '@/layout/AdminLayout';
import AuthLayout from '@/layout/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotFound from '@/pages/404';
import LoadingSpinner from '@/components/LoadingSpinner';
import Login from '@/pages/auth/login/Login';
import ResetPassword from '@/pages/auth/reset-password';
import Register from '@/pages/auth/register';
import ResetPasswordVerify from '@/pages/auth/reset-password/verify';
import { roleNumberToEnum } from '@/utils/helper';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Users = lazy(() => import('@/pages/users'));
const ExpenseCategories = lazy(() => import('@/pages/expense-categories'));
const Expenses = lazy(() => import('@/pages/expenses'));
const Profile = lazy(() => import('@/pages/profile'));
const Income = lazy(() => import('@/pages/income'));
const IncomeCategory = lazy(() => import('@/pages/income/category'));
const News = lazy(() => import('@/pages/news'));
const NewsCategories = lazy(() => import('@/pages/news/categories'));

function flattenNavigationItems(items: typeof NAVIGATION_ITEMS): any[] {
  let result: any[] = [];
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

export default function AppRouter() {
  const userProfile = useUserProfileStore(state => state.userProfile);
  const userRole = userProfile?.role;
  
  let userRoleEnum: ROLE | undefined;
  if (typeof userRole === 'number') {
    userRoleEnum = roleNumberToEnum(userRole);
  } else if (typeof userRole === 'string') {
    userRoleEnum = roleStringToEnum(userRole);
  }

  const flatNavItems = flattenNavigationItems(NAVIGATION_ITEMS);

  const adminRoutes = flatNavItems
    .filter(item => {
      if (!userRoleEnum) return item;
      if (!item.allowedRoles) return true;
      return item.allowedRoles.includes(userRoleEnum);
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
          {item.path === '/profile' && <Profile />}
          {item.path === '/income' && <Income />}
          {item.path === '/income-categories' && <IncomeCategory />}
          {item.path === '/news' && <News />}
          {item.path === '/news-categories' && <NewsCategories />}
        </Suspense>
      )
    }));

  const router = createBrowserRouter([
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
  ]);

  return <RouterProvider router={router} />;
} 