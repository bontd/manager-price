import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/Header';
import { useState } from 'react';

const { Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sidebar collapsed={collapsed}/>
      <Layout>
        <AppHeader setCollapsed={setCollapsed} collapsed={collapsed}/>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
