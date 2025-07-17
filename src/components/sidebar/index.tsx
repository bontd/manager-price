import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMenuItems, getOpenMenuKeys } from '@/utils/constants/navigation';
import { useNavigation } from '@/hook/useNavigation';
import { useUserProfileStore } from '@/stores/useUserProfile';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onMenuClick?: () => void;
}

export default function Sidebar({ collapsed, onMenuClick }: SidebarProps) {
    const { t } = useTranslation();
    const { activeMenuKey, pathname } = useNavigation();
    const userProfile = useUserProfileStore(state => state.userProfile);
    const userRole = userProfile?.role;
    const menuItems = getMenuItems(t, userRole);

    const [openKeys, setOpenKeys] = useState<string[]>(() => getOpenMenuKeys(pathname));

    useEffect(() => {
      setOpenKeys(getOpenMenuKeys(pathname));
    }, [pathname]);

    const handleOpenChange = (keys: string[]) => {
      setOpenKeys(keys);
    };

    return (
        <Sider 
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
              <h1 className={`text-[#fff] font-bold ${collapsed ? 'text-lg' : 'text-xl'}`}>
                {collapsed ? 'FM' : 'Financial Management'}
              </h1>
            </div>
            <Menu
                theme="dark"
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
