import { Button, Form, Input, Card, DatePicker, Radio } from "antd";
import { LockOutlined, UserOutlined, CalendarOutlined, HomeOutlined, ManOutlined, WomanOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IconVI from '@/assets/ico/vi.svg';
import IconEn from '@/assets/ico/en.svg';
import '@/assets/css/login.css';
import { post } from '@/api/config';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { message } from 'antd';
import UserForm from '@/components/UserForm';

const Register = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleRegister = async (values: any) => {
        try {
            await post(API_ENDPOINTS.AUTH.REGISTER, values);
            navigate('/login');
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className="login-page w-[350px] sm:w-[400px] mx-auto flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 font-sans">
            <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200 bg-white">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-2">{t('register.title')}</h1>
                </div>
                <UserForm
                    onFinish={handleRegister}
                    showPasswordFields={true}
                    form={form}
                />
                <div className="text-center text-sm text-gray-500 mt-2">
                    {t('label.haveAccount')} {" "}
                    <Link to="/login" className="text-indigo-500 hover:underline">
                        {t('button.login')}
                    </Link>
                </div>
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

export default Register;