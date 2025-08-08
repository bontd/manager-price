import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Row, 
  Col, 
  message, 
  Space,
  Typography,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  SaveOutlined,
  UndoOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserProfileStore } from '@/stores/useUserProfile';

const { Title } = Typography;

interface EditProfileProps {
  userProfile: any;
}

const EditProfile: React.FC<EditProfileProps> = ({ userProfile }) => {
  const { t } = useTranslation();
  const { setUserProfile } = useUserProfileStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    location: userProfile?.location || '',
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Call API to update profile
      console.log('Updating profile:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setUserProfile({
        ...userProfile,
        ...values,
        updatedAt: new Date().toISOString(),
      });
      
      message.success(t('profile.updateSuccess'));
    } catch (error) {
      message.error(t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(initialValues);
    message.info(t('profile.formReset'));
  };

  return (
    <div className="edit-profile">
      <Card>
        <Title level={4} className="mb-4">
          {t('profile.editTitle')}
        </Title>
        
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
          className="edit-form"
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label={
                  <Space>
                    <UserOutlined />
                    {t('profile.fullName')}
                  </Space>
                }
                rules={[
                  { required: true, message: t('profile.nameRequired') },
                  { min: 2, message: t('profile.nameMinLength') },
                ]}
              >
                <Input 
                  placeholder={t('profile.namePlaceholder')}
                  size="large"
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={
                  <Space>
                    <MailOutlined />
                    {t('profile.email')}
                  </Space>
                }
                rules={[
                  { required: true, message: t('profile.emailRequired') },
                  { type: 'email', message: t('profile.emailInvalid') },
                ]}
              >
                <Input 
                  placeholder={t('profile.emailPlaceholder')}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label={
                  <Space>
                    <PhoneOutlined />
                    {t('profile.phone')}
                  </Space>
                }
                rules={[
                  { pattern: /^[0-9+\-\s()]*$/, message: t('profile.phoneInvalid') },
                ]}
              >
                <Input 
                  placeholder={t('profile.phonePlaceholder')}
                  size="large"
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="location"
                label={
                  <Space>
                    <EnvironmentOutlined />
                    {t('profile.location')}
                  </Space>
                }
              >
                <Input 
                  placeholder={t('profile.locationPlaceholder')}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item className="form-actions">
            <Space size="middle">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                {t('profile.saveChanges')}
              </Button>
              
              <Button 
                onClick={handleReset}
                icon={<UndoOutlined />}
                size="large"
              >
                {t('profile.resetForm')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile; 