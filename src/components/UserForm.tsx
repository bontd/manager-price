import { Button, Form, Input, DatePicker, Radio } from "antd";
import { LockOutlined, UserOutlined, CalendarOutlined, HomeOutlined, ManOutlined, WomanOutlined, SmileOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import React from 'react';

interface UserFormProps {
    onFinish: (values: any) => void;
    initialValues?: any;
    showPasswordFields?: boolean;
    form?: any;
}

const UserForm: React.FC<UserFormProps> = ({ onFinish, initialValues, showPasswordFields = true, form }) => {
    const { t } = useTranslation();
    const [internalForm] = Form.useForm();
    const usedForm = form || internalForm;

    return (
        <Form
            name="userForm"
            form={usedForm}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            initialValues={initialValues}
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
            {showPasswordFields && (
                <>
                    <Form.Item
                        name="password"
                        label={t('label.password')}
                        rules={[
                            { required: true, message: t('validation.required') },
                            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: t('validation.password') }
                        ]}
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
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: t('validation.required') },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value !== getFieldValue('password')) {
                                        return Promise.reject(new Error(t('validation.confirmPassword')));
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            autoComplete="new-password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('placeholder.confirmPassword')}
                            className="py-2"
                        />
                    </Form.Item>
                </>
            )}
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
                    {t('button.save')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm; 