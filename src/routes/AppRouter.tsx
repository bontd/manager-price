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
import { getUser, roleNumberToEnum } from '@/utils/helper';
import ClientLayout from '@/layout/ClientLayout';

const Dashboard = lazy(() => import('@/pages/admin/dashboard/Dashboard'));
const Users = lazy(() => import('@/pages/admin/users'));
const ExpenseCategories = lazy(() => import('@/pages/admin/expense-categories'));
const Expenses = lazy(() => import('@/pages/admin/expenses'));
const Profile = lazy(() => import('@/pages/admin/profile'));
const Income = lazy(() => import('@/pages/admin/income'));
const IncomeCategory = lazy(() => import('@/pages/admin/income/category'));
const News = lazy(() => import('@/pages/admin/news'));
const CreateNews = lazy(() => import('@/pages/admin/news/create'));
const NewsCategories = lazy(() => import('@/pages/admin/news/categories'));
const Home = lazy(() => import('@/pages/client/home'));
const About = lazy(() => import('@/pages/client/about'));
const BlogDetail = lazy(() => import('@/pages/client/blog/detail'));

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
  const user = getUser();
  const userRole = user?.role;
  
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
          {item.path === '/dashboard' && <Dashboard />}
          {item.path === '/users' && <Users />}
          {item.path === '/expense-categories' && <ExpenseCategories />}
          {item.path === '/quizzes' && <Users />}
          {item.path === '/expenses' && <Expenses />}
          {item.path === '/profile' && <Profile />}
          {item.path === '/income' && <Income />}
          {item.path === '/income-categories' && <IncomeCategory />}
          {item.path === '/news' && <News />}
          {item.path === '/news/create' && <CreateNews />}
          {item.path === '/news/edit/:id' && <CreateNews />}
          {item.path === '/news/categories' && <NewsCategories />}
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
    {
      element: <ClientLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/services', element: "Services" },
        { path: '/contact', element: "Contact" },
        { path: '/blog', element: "Blog" },
        { path: '/blog/:slug', element: <BlogDetail /> },
        { path: '/blog/category/:slug', element: "Blog Category" },
        { path: '/blog/tag/:slug', element: "Blog Tag" },
        { path: '/blog/search', element: "Blog Search" },
      ]
    },
    { path: '*', element: <NotFound /> }
  ]);

  return <RouterProvider router={router} />;
} 