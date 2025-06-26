import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMenuItems } from '@/utils/constants/navigation';
import { useNavigation } from '@/hook/useNavigation';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const { t } = useTranslation();
    const { activeMenuKey } = useNavigation();

    const menuItems = getMenuItems(t);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical min-h-[60px]" />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={activeMenuKey}
                items={menuItems}
            />
        </Sider>
    );
}
