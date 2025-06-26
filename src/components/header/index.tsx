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
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hook/useLogout';

const { Header } = Layout;

export default function AppHeader(props: any) {
    const {collapsed, setCollapsed} = props;
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
              // Navigate to profile page
              navigate('/profile');
              break;
            case 'settings':
              // Navigate to settings page
              navigate('/settings');
              break;
            case 'logout':
              // Execute logout function
              logout();
              break;
            default:
              break;
          }
        }
    };

    return (
        <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                }}
            />
            <Space size="large" style={{paddingRight: '1rem'}}>
                <Dropdown menu={languageMenu} placement="bottomRight" arrow>
                    <GlobalOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                </Dropdown>
                <Badge count={4} size="small" offset={[-2, 2]}>
                    <MailOutlined style={{ fontSize: 20 }} />
                </Badge>

                <Badge count={17} size="small" offset={[-2, 2]}>
                <BellOutlined style={{ fontSize: 20 }} />
                </Badge>
                <Dropdown menu={userMenu} placement="bottomRight" arrow>
                    <Avatar 
                        icon={<UserOutlined />} 
                        style={{ cursor: 'pointer' }}
                    />
                </Dropdown>
            </Space>
        </Header>
    );
}
