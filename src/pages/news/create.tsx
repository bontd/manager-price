import { Button, Col, DatePicker, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Tiptap from "@/components/tiptap";


const CreateNews = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log("Form values:", values);
        // Here you would typically send the form data to your backend API
    };

    return (
        <div className="px-[16px]">
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col xs={24} lg={16} xl={16} className="!p-[20px] bg-[#ffffff]">
                        <Form.Item name="title" label={t('news.title')} required>
                            <Input />
                        </Form.Item>
                        <Form.Item name="content" label={t('news.content')} required>
                            <Tiptap value={'<p>Hello Tiptap!</p>'} setTiptap={(value: string) => form.setFieldValue('content', value)}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8} xl={8} className="!pr-[0] flex items-start flex-col flex-wrap gap-[16px]">
                        <div className="w-[100%] !p-[20px] bg-[#ffffff] flex flex-col gap-4">
                            <Form.Item name="status" label={t('news.status')} required>
                                <Select options={[{ label: t('news.status.active'), value: 'active' }, { label: t('news.status.inactive'), value: 'inactive' }]} />
                            </Form.Item>
                            <Form.Item name="publishDate" label={t('news.publishDate')} required>
                                <DatePicker />
                            </Form.Item>
                            <div className="w-[100%] text-right">
                                <Button type="primary" htmlType="submit">Save</Button>
                            </div>
                        </div>
                        <div className="w-[100%] !p-[20px] bg-[#ffffff] flex flex-col gap-4">
                            <Form.Item name="thumbnail" label={t('news.thumbnail')} required>
                                <Upload>
                                    <Button icon={<UploadOutlined />}>{t('news.uploadThumbnail')}</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item className="!mb-[0]" name="category" label={t('news.category')} required>
                                <Select options={[{ label: t('news.category.active'), value: 'active' }, { label: t('news.category.inactive'), value: 'inactive' }]} />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CreateNews;