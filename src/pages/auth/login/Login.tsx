import { Button, Checkbox, Form, Input, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import IconVI from '@/assets/ico/vi.svg';
import IconEn from '@/assets/ico/en.svg';
import '@/assets/css/login.css';
import { setCookie, setUser } from "@/utils/helper/storage";
import { calculateTokenExpiresFromResponse } from "@/utils/helper/tokenExpires";
import useAuth from "@/hook/useAuth";

export default function Login() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  const { login, isLoading, error} = useAuth();

  const handleLogin = async (values: any) => {
    login(values, {
      onSuccess: (data: any) => {
        const { access_token, refresh_token, user } = data.data;
        
        // Tính toán expires từ API response
        const { expires, refreshExpires } = calculateTokenExpiresFromResponse(data.data);
        
        setCookie('token', access_token, { expires });
        setCookie('refreshToken', refresh_token, { expires: refreshExpires });
        setUser(user);
        navigate('/dashboard');
      }
    });
  }

  return (
    <div className="login-page w-full mx-auto flex items-center justify-center">
      <Card className="w-full max-w-[320px] md:max-w-md my-[40px] rounded-2xl shadow-2xl border border-gray-200 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('welcome')}</h1>
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
            label={t('label.email')}
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <Input
              type="text"
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
            <Link className="text-indigo-500 hover:underline text-sm" to="/reset-password">
              {t('label.forgotPassword')}
            </Link>
          </div>

          <Form.Item className="mt-[10px]">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
            >
              {t('button.login')}
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-500">
            {t('label.dontHaveAccount')}{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              {t('label.singnUp')}
            </Link>
          </div>
        </Form>
        <div className="flex justify-center gap-[5px] mt-[10px]">
          <div
            onClick={() => i18n.changeLanguage('en')}
            className={`text-sm px-0 py-1 cursor-pointer ${
              i18n.language === 'en' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <img src={IconEn} alt="English" className="inline-block w-5 h-5 mr-1" />
          </div>
          <div
            onClick={() => i18n.changeLanguage('vi')}
            className={`text-sm px-0 py-1 cursor-pointer ${
              i18n.language === 'vi' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <img src={IconVI} alt="Vietnamese" className="inline-block w-5 h-5 mr-1" />
          </div>
        </div>

      </Card>
    </div>
  )
}
