import { Button, Checkbox, Form, Input, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import IconVI from '@/assets/ico/vi.svg';
import IconEn from '@/assets/ico/en.svg';

export default function Login() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  const handleLogin = (values: any) => {
    // giả lập login
    console.log('Login values:', values);
    // localStorage.setItem('token', 'fake-token')
    // navigate('/')
  }

  return (
    <div className="w-[400px] min-h-screen mx-auto flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 font-sans">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">{t('welcome')}</h1>
          <p className="text-gray-500">{t('description')}</p>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label={t('label.username')}
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <Input
              autoComplete="new-username"
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder={t('placeholder.username')}
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('label.password')}
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <Input.Password
              autoComplete="new-password"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder={t('placeholder.password')}
              className="py-2"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('label.rememberMe')}</Checkbox>
            </Form.Item>
            <a className="text-indigo-500 hover:underline text-sm" href="#">
              {t('label.forgotPassword')}
            </a>
          </div>

          <Form.Item className="mt-[10px]">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
            >
              {t('button.login')}
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-500">
            {t('label.dontHaveAccount')}{" "}
            <a href="#" className="text-indigo-500 hover:underline">
              {t('label.singnUp')}
            </a>
          </div>
        </Form>
        <div className="flex justify-center gap-[10px] mt-[10px]">
          <div
            onClick={() => i18n.changeLanguage('en')}
            className={`text-sm px-3 py-1 cursor-pointer ${
              i18n.language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'opacity-50'
            }`}
          >
            <img src={IconEn} alt="English" className="inline-block w-5 h-5 mr-1" />
          </div>
          <div
            onClick={() => i18n.changeLanguage('vi')}
            className={`text-sm px-3 py-1 cursor-pointer ${
              i18n.language === 'vi' ? 'bg-indigo-100 text-indigo-700' : 'opacity-50'
            }`}
          >
            <img src={IconVI} alt="Vietnamese" className="inline-block w-5 h-5 mr-1" />
          </div>
        </div>

      </Card>
    </div>
  )
}
