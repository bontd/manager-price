import { DashboardOutlined, FolderOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { ROLE } from './enum';
import { roleNumberToEnum } from '../helper';

export interface NavigationItem {
  key: string;
  path?: string;
  icon?: React.ComponentType;
  label: string;
  translationKey: string;
  children?: NavigationItem[];
  allowedRoles?: ROLE[];
  isHidden?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: '1',
    path: '/',
    icon: DashboardOutlined,
    label: 'Dashboard',
    translationKey: 'navigation.dashboard',
    allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN, ROLE.USER]
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
        allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN],
      },
      // Thêm children khác nếu cần
    ]
  },
  {
    key: '3',
    icon: VideoCameraOutlined,
    label: 'Income',
    translationKey: 'navigation.income',
    children: [
      {
        key: '3-1',
        path: '/income',
        label: 'Income List',
        translationKey: 'navigation.incomeList',
        allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN, ROLE.USER],
      },
      {
        key: '3-2',
        path: '/income-categories',
        label: 'Income Categories',
        translationKey: 'navigation.incomeCategories',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
      },
      // Thêm children khác nếu cần
    ]
  },
  {
    key: '4',
    icon: FolderOutlined,
    label: 'Expenses',
    translationKey: 'navigation.expenses',
    children: [
      {
        key: '4-1',
        path: '/expenses',
        label: 'Expenses',
        translationKey: 'navigation.expenses',
        allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN, ROLE.USER],
      },
      {
        key: '4-2',
        path: '/expense-categories',
        label: 'Expense Categories',
        translationKey: 'navigation.expenseCategories',
        allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN, ROLE.USER],
      },
    ]
  },
  {
    key: '5',
    path: '/profile',
    icon: UserOutlined,
    label: 'Profile',
    translationKey: 'navigation.profile',
    allowedRoles: [ROLE.ADMINISTRATOR, ROLE.ADMIN, ROLE.USER],
    isHidden: true,
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

export const getOpenMenuKeys = (pathname: string): string[] => {
  const openKeys: string[] = [];
  const findOpenKeys = (items: NavigationItem[], parentKey?: string): boolean => {
    for (const item of items) {
      if (item.path === pathname) {
        if (parentKey) openKeys.push(parentKey);
        return true;
      }
      if (item.children) {
        if (findOpenKeys(item.children, item.key)) {
          if (parentKey) openKeys.push(parentKey);
          else openKeys.push(item.key);
          return true;
        }
      }
    }
    return false;
  };
  findOpenKeys(NAVIGATION_ITEMS);
  return openKeys;
};

// Shared function to map string role to enum value
export const roleStringToEnum = (roleStr: string | undefined | null): ROLE => {
  if (!roleStr || typeof roleStr !== 'string') {
    return ROLE.USER; // Default to USER role
  }
  
  switch (roleStr.toLowerCase()) {
    case 'administrator': return ROLE.ADMINISTRATOR;
    case 'admin': return ROLE.ADMIN;
    case 'manager': return ROLE.MANAGER;
    case 'user': return ROLE.USER;
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
    if (item.key === '1') return true; // Always show Dashboard
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
    if (item.isHidden) return false;
    
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