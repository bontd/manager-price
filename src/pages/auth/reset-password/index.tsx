import { Button, Card, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";
import IconVI from '@/assets/ico/vi.svg';
import IconEn from '@/assets/ico/en.svg';
import useAuth from '@/hook/useAuth';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { t, i18n } = useTranslation();

    const { resetPassword, isLoadingResetPassword, errorResetPassword } = useAuth();

    const handleResetPassword = (values: any) => {
        
        resetPassword({
            ...values,
            url: window.location.protocol + '//' + window.location.host + '/reset-password/',
        });
    }

    return (
        <div className="login-page w-[350px] sm:w-[400px] mx-auto flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 font-sans">
            <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200 bg-white">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-600 mb-2">{t('resetPassword.title')}</h1>
            </div>
            <Form
                name="resetPassword"
                onFinish={handleResetPassword}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                name="email"
                label={t('label.email')}
                rules={[{ required: true, message: t('validation.required') }, { type: 'email', message: t('validation.email') }]}
                >
                <Input
                    type="email"
                    autoComplete="new-username"
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder={t('placeholder.email')}
                    className="py-2"
                />
                </Form.Item>
    
                <Form.Item className="mt-[10px]">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingResetPassword}
                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                >
                    {t('button.resetPassword')}
                </Button>
                </Form.Item>
    
                <div className="text-center text-sm text-gray-500">
                {t('label.haveAccount')}{" "}
                <Link to="/login" className="text-indigo-500 hover:underline">
                    {t('label.login')}
                </Link>
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

export default ResetPassword;