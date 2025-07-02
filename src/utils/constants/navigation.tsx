import { DashboardOutlined, FolderOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { getUserInfo } from '@/utils/helper/storage';
import { ROLE } from './enum';

export interface NavigationItem {
  key: string;
  path?: string;
  icon?: React.ComponentType;
  label: string;
  translationKey: string;
  children?: NavigationItem[];
  allowedRoles?: string[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: '1',
    path: '/',
    icon: DashboardOutlined,
    label: 'Dashboard',
    translationKey: 'navigation.dashboard',
    allowedRoles: ['admin', 'user']
  },
  {
    key: '2',
    icon: UserOutlined,
    label: 'Users',
    translationKey: 'navigation.users',
    children: [
      {
        key: '2-1',
        path: '/users',
        label: 'User List',
        translationKey: 'navigation.usersList',
        allowedRoles: ['admin'],
      },
      // Thêm children khác nếu cần
    ]
  },
  {
    key: '3',
    icon: VideoCameraOutlined,
    label: 'Quizzes',
    translationKey: 'navigation.quizzes',
    children: [
      {
        key: '3-1',
        path: '/quizzes',
        label: 'Quiz List',
        translationKey: 'navigation.quizzesList',
        allowedRoles: ['admin', 'user'],
      },
      // Thêm children khác nếu cần
    ]
  },
  {
    key: '4',
    path: '/expense-categories',
    icon: FolderOutlined,
    label: 'Expense Categories',
    translationKey: 'navigation.expenseCategories',
    allowedRoles: ['admin', 'user'],
  },
  {
    key: '5',
    path: '/expenses',
    icon: FolderOutlined,
    label: 'Expenses',
    translationKey: 'navigation.expenses',
    allowedRoles: ['admin', 'user'],
  }
];

export const getActiveMenuKey = (pathname: string): string[] => {
  const findKey = (items: NavigationItem[]): string | undefined => {
    for (const item of items) {
      if (item.path === pathname) return item.key;
      if (item.children) {
        const childKey = findKey(item.children);
        if (childKey) return childKey;
      }
    }
    return undefined;
  };
  const key = findKey(NAVIGATION_ITEMS);
  return key ? [key] : ['1']; // Default to dashboard
};

// Shared function to map string role to enum value
export const roleStringToEnum = (roleStr: string) => {
  switch (roleStr.toLowerCase()) {
    case 'admin': return ROLE.ADMIN;
    case 'user': return ROLE.USER;
    default: return undefined;
  }
};

function mapItems(items: NavigationItem[], t: (key: string) => string): NonNullable<MenuProps['items']> {
  const userInfo = getUserInfo();
  const userRole = userInfo?.role;

  // Helper to check if an item or its children is allowed
  const isItemAllowed = (item: NavigationItem): boolean => {
    if (item.allowedRoles) {
      const allowedEnumRoles = item.allowedRoles.map(roleStringToEnum);
      if (!userRole || !allowedEnumRoles.includes(userRole)) return false;
    }
    if (item.children) {
      // At least one child must be allowed
      return item.children.some(isItemAllowed);
    }
    return true;
  };

  return items
    .filter(isItemAllowed)
    .map((item) => {
      const label: React.ReactNode = item.path
        ? <Link to={item.path}>{t(item.translationKey)}</Link>
        : t(item.translationKey);
      return {
        key: item.key,
        icon: item.icon ? React.createElement(item.icon) : undefined,
        label,
        children: item.children ? mapItems(item.children, t) : undefined,
      };
    });
}

export const getMenuItems = (t: (key: string) => string): NonNullable<MenuProps['items']> => {
  return mapItems(NAVIGATION_ITEMS, t);
};