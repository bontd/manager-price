import React from 'react';
import { Descriptions, Typography, Card, Row, Col, Tag, Space } from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  CalendarOutlined, 
  IdcardOutlined,
  UserOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { roleStringToEnum } from '@/utils/constants/navigation';

const { Title, Text } = Typography;

interface ProfileInfoProps {
  userProfile: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userProfile }) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="profile-info">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title={t('profile.personalInfo')} className="info-card">
            <Descriptions column={1} size="small">
              <Descriptions.Item 
                label={
                  <Space>
                    <UserOutlined />
                    {t('profile.fullName')}
                  </Space>
                }
              >
                {userProfile?.name || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <MailOutlined />
                    {t('profile.email')}
                  </Space>
                }
              >
                {userProfile?.email || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <UserOutlined />
                    {t('profile.gender')}
                  </Space>
                }
              >
                {userProfile?.gender || '-'}
              </Descriptions.Item>

              <Descriptions.Item 
                label={
                  <Space>
                    <PhoneOutlined />
                    {t('profile.phone')}
                  </Space>
                }
              >
                {userProfile?.phone || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <IdcardOutlined />
                    {t('profile.role')}
                  </Space>
                }
              >
                <Tag color="blue">{roleStringToEnum(userProfile?.role) || 'User'}</Tag>
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <EnvironmentOutlined />
                    {t('profile.location')}
                  </Space>
                }
              >
                {userProfile?.address || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card title={t('profile.accountInfo')} className="info-card">
            <Descriptions column={1} size="small">
              <Descriptions.Item 
                label={
                  <Space>
                    <IdcardOutlined />
                    {t('profile.userId')}
                  </Space>
                }
              >
                {userProfile?.id || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <CalendarOutlined />
                    {t('profile.createdAt')}
                  </Space>
                }
              >
                {formatDate(userProfile?.created_at)}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={
                  <Space>
                    <CalendarOutlined />
                    {t('profile.lastUpdated')}
                  </Space>
                }
              >
                {formatDate(userProfile?.updated_at)}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={t('profile.status')}
              >
                <Tag color="green">{userProfile?.status ? t('profile.statusActive') : t('profile.statusInactive')}</Tag>
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={t('profile.lastLogin')}
              >
                {formatDate(userProfile?.lastLoginAt) || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInfo; 