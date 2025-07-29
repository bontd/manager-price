import React, { useState, useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import AppHeader from '@/components/header';
import AppFooter from '@/components/footer';
import { get } from '@/api/config';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { useUserProfileStore } from '@/stores/useUserProfile';
import { getToken } from '@/utils/helper/storage';

const { Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setUserProfile } = useUserProfileStore();
  const userProfile = useUserProfileStore(state => state.userProfile);

  // Call API to get user profile when component mounts (F5)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        if (token) {
          const userInfo = await get<any>(API_ENDPOINTS.USER.PROFILE);
          if (userInfo?.records?.data?.user) {
            setUserProfile(userInfo.records.data.user);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    if (!userProfile) {
      fetchUserProfile();
    }
  }, [userProfile]);

  // Handle responsive breakpoints
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1280);
      if (window.innerWidth <= 1280) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={handleMobileClose}
        open={mobileOpen}
        width={280}
        bodyStyle={{ padding: 0 }}
        className="md:hidden"
      >
        <Sidebar collapsed={false} onMenuClick={handleMobileClose} />
      </Drawer>

      <Layout 
        style={{ 
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 280),
          transition: 'margin-left 0.2s'
        }}
      >
        <AppHeader 
          setCollapsed={handleCollapse} 
          collapsed={collapsed}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <Content 
          style={{ 
            padding: 16, 
            borderRadius: isMobile ? 8 : 0,
            minHeight: isMobile ? 'calc(100vh - 56px - 60px)' : 'calc(100vh - 64px - 70px)' // Account for header and footer
          }}
        >
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}
