import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, getActiveMenuKey } from '@/utils/constants/navigation';

export const useNavigation = () => {
  const location = useLocation();

  const activeMenuKey = getActiveMenuKey(location.pathname);
  
  const currentRoute = NAVIGATION_ITEMS.find(item => item.path === location.pathname);
  
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