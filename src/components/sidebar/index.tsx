import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { getMenuItems, getOpenMenuKeys } from '@/utils/constants/navigation';
import { useNavigation } from '@/hook/useNavigation';
import { getUser } from '@/utils/helper';
import { Link } from 'react-router-dom';
import { useToggleDark } from '@/stores/useToggleDark';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onMenuClick?: () => void;
}

export default function Sidebar({ collapsed, onMenuClick }: SidebarProps) {
    const { t } = useTranslation();
    const { activeMenuKey, pathname } = useNavigation();
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const {isDarkMode} = useToggleDark((state) => state);
    const user = getUser();
    const userRole = user?.role;

    const [openKeys, setOpenKeys] = useState<string[]>(() => getOpenMenuKeys(pathname));

    useEffect(() => {
      setOpenKeys(getOpenMenuKeys(pathname));
    }, [pathname]);

    useEffect(() => {
      setMenuItems(getMenuItems(t, userRole));
    }, [userRole, t]);

    const handleOpenChange = (keys: string[]) => {
      setOpenKeys(keys);
    };

    return (
        <Sider 
          theme={isDarkMode ? 'dark' : 'light'}
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          width={280}
          collapsedWidth={80}
          className="sidebar-component"
          style={{
            minHeight: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
            <div className="demo-logo-vertical min-h-[60px] flex items-center justify-center">
              <h1 className={`${isDarkMode ? 'text-[#ffffff]' : 'text-[#000000]'} font-bold ${collapsed ? 'text-lg' : 'text-xl'}`}>
                <Link to="/">{collapsed ? t('info.shortTitle') : t('info.title')}</Link>
              </h1>
            </div>
            <Menu
                theme={isDarkMode ? 'dark' : 'light'}
                mode="inline"
                selectedKeys={activeMenuKey}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                items={menuItems}
                style={{
                  borderRight: 0,
                  height: 'calc(100vh - 60px)',
                  overflowY: 'auto'
                }}
                className="sidebar-menu"
                onClick={onMenuClick}
            />
        </Sider>
    );
}
