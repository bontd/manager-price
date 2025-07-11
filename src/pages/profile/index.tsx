import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Avatar, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Upload, 
  message,
  Divider,
  Space,
  Tag,
  Descriptions,
  Statistic
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  LockOutlined, 
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserProfileStore } from '@/stores/useUserProfile';
import ProfileInfo from './components/ProfileInfo';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import './profile.css';
import { roleStringToEnum } from '@/utils/constants/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
  const { t } = useTranslation();
  const { userProfile } = useUserProfileStore();
  const [activeTab, setActiveTab] = useState('info');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${t('profile.avatarUploadSuccess')}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${t('profile.avatarUploadError')}`);
    }
  };

  const uploadProps = {
    name: 'avatar',
    action: '/api/upload/avatar',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: handleAvatarUpload,
  };

  return (
    <div className="profile-page">
      <Row gutter={[24, 24]}>
        {/* Profile Header */}
        <Col xs={24} lg={8}>
          <Card className="profile-header-card">
            <div className="text-center">
              <div className="avatar-section mb-4">
                <Upload {...uploadProps} showUploadList={false}>
                  <div className="avatar-wrapper">
                    <Avatar 
                      size={120} 
                      src={userProfile?.avatar}
                      icon={<UserOutlined />}
                      className="profile-avatar"
                    />
                    <div className="avatar-overlay">
                      <UploadOutlined />
                    </div>
                  </div>
                </Upload>
              </div>
              
              <Title level={3} className="mb-2">
                {userProfile?.name || t('profile.defaultName')}
              </Title>
              
              <Text type="secondary" className="mb-3 block">
                {userProfile?.email || 'user@example.com'}
              </Text>
              
              <Space className="mb-4">
                <Tag color="blue">{roleStringToEnum(userProfile?.role) || 'User'}</Tag>
                <Tag color="green">{userProfile?.status ? t('profile.statusActive') : t('profile.statusInactive')}</Tag>
              </Space>
              
              <Divider />
              
              <Row gutter={16} className="stats-row">
                <Col span={8}>
                  <Statistic 
                    title={t('profile.totalExpenses')} 
                    value={userProfile?.totalExpenses || 0}
                    prefix="$"
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title={t('profile.categories')} 
                    value={userProfile?.categoriesCount || 0}
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title={t('profile.daysActive')} 
                    value={userProfile?.daysActive || 0}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Profile Content */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs 
              activeKey={activeTab} 
              onChange={handleTabChange}
              type="card"
              className="profile-tabs"
            >
              <TabPane 
                tab={
                  <span>
                    <UserOutlined />
                    {t('profile.tabInfo')}
                  </span>
                } 
                key="info"
              >
                <ProfileInfo userProfile={userProfile} />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <EditOutlined />
                    {t('profile.tabEdit')}
                  </span>
                } 
                key="edit"
              >
                <EditProfile userProfile={userProfile} />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <LockOutlined />
                    {t('profile.tabPassword')}
                  </span>
                } 
                key="password"
              >
                <ChangePassword />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;