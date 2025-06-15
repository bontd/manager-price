import React, { useState } from 'react';
import {
    BellOutlined,
    MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu, Space, theme } from 'antd';

const { Header } = Layout;

export default function AppHeader(props: any) {
    const {collapsed, setCollapsed} = props;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
                <Badge count={4} size="small" offset={[-2, 2]}>
                    <MailOutlined style={{ fontSize: 20 }} />
                </Badge>

                <Badge count={17} size="small" offset={[-2, 2]}>
                <BellOutlined style={{ fontSize: 20 }} />
                </Badge>
                <Avatar icon={<UserOutlined />} />
            </Space>
        </Header>
    );
}
