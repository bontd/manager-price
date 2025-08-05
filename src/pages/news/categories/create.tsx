import useNewsCategories from "@/hook/useNewsCategories";
import { Button, Form, Input, Modal } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const NewsCategoriesCreate = ({ open, setOpen, dataEdit }: { open: boolean, setOpen: (open: boolean) => void, dataEdit: any }) => {
    const { t } = useTranslation();
    const { createQuery, createLoading } = useNewsCategories();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);

    const onFinish = (values: any) => {
        createQuery.mutate(values, {
            onSuccess: () => {
                setOpen(false);
                form.resetFields();
            }
        });
    }

    useEffect(() => {
        if (dataEdit) {
            form.setFieldsValue({
                name: dataEdit.name,
                slug: dataEdit.slug,
                description: dataEdit.description
            });
        } else {
            form.resetFields();
        }
    }, [dataEdit]);

    return (
        <Modal
            title={t('newsCategories.createTitle')}
            open={open}
            onCancel={() => setOpen(false)}
            footer={[
                <Button key="cancel" onClick={() => setOpen(false)} loading={createLoading}>
                    {t('cancel')}
                </Button>,
                <Button key="save" type="primary" loading={createLoading} onClick={() => form.submit()}>
                    {t('save')}
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label={t('newsCategories.name')} name="name">
                    <Input onBlur={(e) => {
                        const nameValue = e.target.value;
                        if (nameValue && typeof nameValue === 'string') {
                            form.setFieldsValue({
                                slug: slugify(nameValue, { lower: true, strict: true })
                            });
                        }
                    }} />
                </Form.Item>
                <div className="w-full flex items-center">
                    <Form.Item label={t('newsCategories.slug')} name="slug" className="flex-1">
                        <Input disabled={isDisabled} />
                    </Form.Item>
                    <Button type="link" onClick={() => setIsDisabled(!isDisabled)} className="!p-[0] ml-[10px]">
                        {isDisabled ? <EditOutlined /> : <SaveOutlined />}
                    </Button>
                </div>
                <Form.Item label={t('newsCategories.description')} name="description">
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewsCategoriesCreate;