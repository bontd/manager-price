import { Button, Card, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hook/useAuth";
import { LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";

const ResetPasswordVerify = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [form] = Form.useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { verifyResetPassword, isLoadingVerifyResetPassword } = useAuth();

    const handleVerifyResetPassword = (values: any) => {
        verifyResetPassword({
            ...values,
            token: token,
        }, {
            onSuccess: (data: any) => {
                navigate('/login');
            }
        });
    }
    
    return (
        <div className="login-page w-full mx-auto flex items-center justify-center">
            <Card className="w-full max-w-[320px] md:max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">{t('resetPassword.title')}</h1>
                </div>
                <Form
                    name="verifyResetPassword"
                    onFinish={handleVerifyResetPassword}
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                    name="password"
                    label={t('label.password')}
                    rules={[{ required: true, message: t('validation.required') }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: t('validation.password') }]}
                    >
                        <Input.Password
                            type={passwordVisible ? "text" : "password"}
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
                            type={confirmPasswordVisible ? "text" : "password"}
                            autoComplete="new-password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.confirmPassword')}
                            className="py-2"
                        />
                    </Form.Item>
        
                    <Form.Item className="mt-[10px]">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoadingVerifyResetPassword}
                            className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                        >
                            {t('button.resetPassword')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default ResetPasswordVerify;