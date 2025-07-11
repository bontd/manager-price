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
                <Form
                    name="register"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleRegister}
                >
                    <Form.Item
                        name="name"
                        label={t('label.name')}
                        rules={[{ required: true, message: t('validation.required') }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.name')}
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={t('label.email')}
                        rules={[{ required: true, message: t('validation.required') }]}
                    >
                        <Input
                            type="email"
                            autoComplete="new-username"
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.email')}
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={t('label.password')}
                        rules={[{ required: true, message: t('validation.required') }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: t('validation.password') }]}
                    >
                        <Input.Password
                            autoComplete="new-password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.password')}
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label={t('label.confirmPassword')}
                        rules={[{ required: true, message: t('validation.required') }, { validator: (_, value, callback) => {
                            if (value !== form.getFieldValue('password')) {
                                return Promise.reject(new Error(t('validation.confirmPassword')));
                            }
                            return Promise.resolve();
                        } }]}
                    >
                        <Input.Password
                            autoComplete="new-password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.confirmPassword')}
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        label={t('label.birthday')}
                    >
                        <DatePicker
                            className="w-full py-2"
                            placeholder={t('placeholder.birthday')}
                            format="YYYY-MM-DD"
                            suffixIcon={<CalendarOutlined className="text-gray-400" />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label={t('label.address')}
                    >
                        <Input
                            prefix={<HomeOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.address')}
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label={t('label.gender')}
                    >
                        <Radio.Group className="w-full flex flex-col gap-[10px]">
                            <Radio value="1"><ManOutlined className="mr-[5px]" />{t('label.male')}</Radio>
                            <Radio value="2"><WomanOutlined className="mr-[5px]" />{t('label.female')}</Radio>
                            <Radio value="3"><SmileOutlined className="mr-[5px]" />{t('label.other')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className="mt-[10px]">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                        >
                            {t('button.register')}
                        </Button>
                    </Form.Item>
                    <div className="text-center text-sm text-gray-500">
                        {t('label.haveAccount')} {" "}
                        <Link to="/login" className="text-indigo-500 hover:underline">
                            {t('button.login')}
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

export default Register;