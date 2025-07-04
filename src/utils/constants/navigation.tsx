import { DashboardOutlined, FolderOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { ROLE } from './enum';
import { log } from 'node:console';

export interface NavigationItem {
  key: string;
  path?: string;
  icon?: React.ComponentType;
  label: string;
  translationKey: string;
  children?: NavigationItem[];
  allowedRoles?: ROLE[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: '1',
    path: '/',
    icon: DashboardOutlined,
    label: 'Dashboard',
    translationKey: 'navigation.dashboard',
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
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
        allowedRoles: [ROLE.ADMIN],
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
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
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
    allowedRoles: [ROLE.ADMIN, ROLE.USER],
  },
  {
    key: '5',
    path: '/expenses',
    icon: FolderOutlined,
    label: 'Expenses',
    translationKey: 'navigation.expenses',
    allowedRoles: [ROLE.ADMIN, ROLE.USER],
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
export const roleStringToEnum = (roleStr: string | undefined | null): ROLE => {
  if (!roleStr || typeof roleStr !== 'string') {
    return ROLE.USER; // Default to USER role
  }
  
  switch (roleStr.toLowerCase()) {
    case 'admin': return ROLE.ADMIN;
    case 'user': return ROLE.USER;
    default: return ROLE.USER;
  }
};

// Shared function to map number role to enum value
export const roleNumberToEnum = (roleNum: number | undefined | null): ROLE => {
  if (roleNum === undefined || roleNum === null) {
    return ROLE.USER; // Default to USER role
  }
  
  switch (roleNum) {
    case 1: return ROLE.ADMIN;
    case 3: return ROLE.USER;
    default: return ROLE.USER;
  }
};

function mapItems(
  items: NavigationItem[],
  t: (key: string) => string,
  userRole: string | number | undefined | null
): NonNullable<MenuProps['items']> {
  // Helper to check if an item or its children is allowed
  
  const isItemAllowed = (item: NavigationItem): boolean => {
    if (item.allowedRoles) {
      let userRoleEnum: ROLE;
      
      if (typeof userRole === 'number') {
        userRoleEnum = roleNumberToEnum(userRole);
      } else {
        userRoleEnum = roleStringToEnum(userRole);
      }
      
      if (!userRole || !item.allowedRoles.includes(userRoleEnum)) return false;
    }
    if (item.children) {
      // At least one child must be allowed
      return item.children.some(child => isItemAllowed(child));
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
        children: item.children ? mapItems(item.children, t, userRole) : undefined,
      };
    });
}

export const getMenuItems = (
  t: (key: string) => string,
  userRole: string | number | undefined | null
): NonNullable<MenuProps['items']> => {
  return mapItems(NAVIGATION_ITEMS, t, userRole);
};