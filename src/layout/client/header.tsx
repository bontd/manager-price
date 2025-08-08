import { Button, Col, Menu, Row, Drawer, Grid, Avatar, Dropdown } from "antd";
import { DashboardOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Logo from "@/assets/images/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "@/utils/helper/storage";
import { useTranslation } from "react-i18next";
import { useLogout } from '@/hook/useLogout';

const { useBreakpoint } = Grid;

const Header = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const userInfor = getUser()
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logout = useLogout();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = [
    { key: "about-us", label: <a href="/about">About us</a> },
    { key: "services", label: <a href="/services">Services</a> },
    { key: "case-studies", label: <a href="/case-study">Case Studies</a> },
    { key: "blog", label: <a href="/blog">Blog</a> },
    { key: "how-it-works", label: <a href="/how-it-work">How it Works</a> },
    { key: "hire", label: <a href="/hire">Hire</a> },
  ];

  const userMenu: any = {
    items: [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: t('navigation.dashboard'),
        path: '/dashboard',
      },
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
        path: '/settings',
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
        case 'dashboard':
            navigate('/dashboard');
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

  return (
    <div className="w-full sticky top-[0] z-[9] px-[20px] py-[10px] bg-[#fff] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
      <Row align="middle" justify="space-between">
        <Col>
          <img src={Logo} alt="logo" className="w-[150px]" />
        </Col>
        {!isMobile && (
          <Col flex="auto">
            <Menu
              mode="horizontal"
              className="!bg-transparent !border-none justify-center text-[16px] !text-[#4A5568]"
              items={items}
            />
          </Col>
        )}

        <Col className="flex items-center gap-4">
          {userInfor && userInfor.role ? (
            <Dropdown menu={userMenu} placement="bottomRight" arrow trigger={['click']}>
              <Avatar 
                  icon={<UserOutlined />} 
                  style={{ 
                  cursor: 'pointer',
                  width: isMobile ? 32 : 40,
                  height: isMobile ? 32 : 40
                  }}
              />
            </Dropdown>
          ) : (
            <div className="flex items-center gap-4 text-[16px]">
              <Link to="/login">
                Login
              </Link>
              <Link to="/register">
                Register
              </Link>
            </div>
          )}

          {isMobile && (
            <>
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: 24 }} />}
                onClick={() => setDrawerOpen(true)}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
              >
                <Menu
                  mode="vertical"
                  items={items}
                  className="!bg-transparent !border-none text-base font-semibold"
                  onClick={() => setDrawerOpen(false)}
                />
              </Drawer>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
