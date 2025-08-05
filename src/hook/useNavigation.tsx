import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, getActiveMenuKey } from '@/utils/constants/navigation';

export const useNavigation = () => {
  const location = useLocation();

  const activeMenuKey = getActiveMenuKey(location.pathname);
  
  // Find current route including dynamic routes
  const findCurrentRoute = (items: typeof NAVIGATION_ITEMS): any => {
    for (const item of items) {
      // Check exact match first
      if (item.path === location.pathname) return item;
      
      // Check for dynamic routes (paths with :id, :slug, etc.)
      if (item.path && item.path.includes(':')) {
        const pathPattern = item.path.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${pathPattern}$`);
        if (regex.test(location.pathname)) return item;
      }
      
      if (item.children) {
        const childRoute = findCurrentRoute(item.children);
        if (childRoute) return childRoute;
      }
    }
    return null;
  };
  
  const currentRoute = findCurrentRoute(NAVIGATION_ITEMS);
  
  const isActiveRoute = (path: string) => location.pathname === path;
  
  const getBreadcrumbItems = () => {
    const items = [];
    if (currentRoute) {
      items.push(currentRoute.label);
    }
    return items;
  };

  return {
    activeMenuKey,
    currentRoute,
    isActiveRoute,
    getBreadcrumbItems,
    pathname: location.pathname
  };
}; 