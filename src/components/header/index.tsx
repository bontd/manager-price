import React, { useState } from 'react';
import {
    BellOutlined,
    GlobalOutlined,
    MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, theme, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hook/useLogout';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function AppHeader({ 
  collapsed, 
  setCollapsed, 
  isMobile = false,
  mobileOpen = false,
  setMobileOpen
}: AppHeaderProps) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const logout = useLogout();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const languageMenu: any = {
        items: [
          {
            key: 'en',
            label: '🇺🇸 English',
          },
          {
            key: 'vi',
            label: '🇻🇳 Tiếng Việt',
          },
        ],
        onClick: ({ key } : any) => {
          i18n.changeLanguage(key);
        }
    };

    const userMenu: any = {
        items: [
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: t('navigation.profile'),
            path: '/profile',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: t('navigation.settings'),
          },
          {
            type: 'divider',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: t('navigation.logout'),
            danger: true,
          },
        ],
        onClick: ({ key } : any) => {
          switch (key) {
            case 'profile':
              navigate('/profile');
              break;
            case 'settings':
              navigate('/settings');
              break;
            case 'logout':
              logout();
              break;
            default:
              break;
          }
        }
    };

    const handleMenuClick = () => {
      if (isMobile && setMobileOpen) {
        setMobileOpen(!mobileOpen);
      } else {
        setCollapsed(!collapsed);
      }
    };

    return (
        <Header 
          style={{
            position: 'sticky',
            top: 0,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: isMobile ? '0 8px' : '0 16px', 
            background: colorBgContainer,
            height: isMobile ? '56px' : '64px',
            zIndex: 1000,
            borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
          }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleMenuClick}
                style={{
                  fontSize: '16px',
                  width: isMobile ? 48 : 64,
                  height: isMobile ? 48 : 64,
                }}
            />
            
            <Space 
              size={isMobile ? "small" : "large"} 
              style={{paddingRight: isMobile ? '0.5rem' : '1rem'}}
            >
                {/* Language selector - hide on very small screens */}
                <div>
                  <Dropdown menu={languageMenu} placement="bottomRight" arrow>
                    <GlobalOutlined style={{ fontSize: isMobile ? 16 : 20, cursor: 'pointer' }} />
                  </Dropdown>
                </div>

                {/* Notifications - hide on very small screens */}
                <div className={isMobile ? 'hidden sm:block' : ''}>
                  <Badge count={4} size="small" offset={[-2, 2]}>
                    <MailOutlined style={{ fontSize: isMobile ? 16 : 20 }} />
                  </Badge>
                </div>

                {/* Bell notification - always show */}
                <Badge count={17} size="small" offset={[-2, 2]}>
                  <BellOutlined style={{ fontSize: isMobile ? 16 : 20 }} />
                </Badge>

                {/* User avatar */}
                <Dropdown menu={userMenu} placement="bottomRight" arrow>
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ 
                      cursor: 'pointer',
                      width: isMobile ? 32 : 40,
                      height: isMobile ? 32 : 40
                    }}
                  />
                </Dropdown>
            </Space>
        </Header>
    );
}
