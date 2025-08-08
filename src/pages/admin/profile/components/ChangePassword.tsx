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
  Divider,
  Alert
} from 'antd';
import { 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  KeyOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Password } = Input;

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Call API to change password
      console.log('Changing password:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(t('profile.passwordChangeSuccess'));
      form.resetFields();
    } catch (error) {
      message.error(t('profile.passwordChangeError'));
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = (_: any, value: string) => {
    const password = form.getFieldValue('newPassword');
    if (value && value !== password) {
      return Promise.reject(new Error(t('profile.passwordMismatch')));
    }
    return Promise.resolve();
  };

  return (
    <div className="change-password">
      <Card>
        <Title level={4} className="mb-4">
          {t('profile.changePasswordTitle')}
        </Title>
        
        <Alert
          message={t('profile.passwordRequirements')}
          description={t('profile.passwordRequirementsDesc')}
          type="info"
          showIcon
          className="mb-4"
        />
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="password-form"
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="currentPassword"
                label={
                  <Space>
                    <LockOutlined />
                    {t('profile.currentPassword')}
                  </Space>
                }
                rules={[
                  { required: true, message: t('profile.currentPasswordRequired') },
                ]}
              >
                <Password
                  placeholder={t('profile.currentPasswordPlaceholder')}
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="newPassword"
                label={
                  <Space>
                    <KeyOutlined />
                    {t('profile.newPassword')}
                  </Space>
                }
                rules={[
                  { required: true, message: t('profile.newPasswordRequired') },
                  { min: 8, message: t('profile.passwordMinLength') },
                  { 
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: t('profile.passwordComplexity')
                  },
                ]}
              >
                <Password
                  placeholder={t('profile.newPasswordPlaceholder')}
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="confirmPassword"
                label={
                  <Space>
                    <LockOutlined />
                    {t('profile.confirmPassword')}
                  </Space>
                }
                rules={[
                  { required: true, message: t('profile.confirmPasswordRequired') },
                  { validator: validateConfirmPassword },
                ]}
              >
                <Password
                  placeholder={t('profile.confirmPasswordPlaceholder')}
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
                {t('profile.changePassword')}
              </Button>
              
              <Button 
                onClick={() => form.resetFields()}
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

export default ChangePassword; 