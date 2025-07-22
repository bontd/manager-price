import { Button, Col, DatePicker, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor

const News = () => {
    const { t } = useTranslation();
    return (
        <Form layout="vertical">
            <Row gutter={24}>
                <Col xs={24} lg={16} xl={16}>
                    <Form.Item name="title" label={t('news.title')} required>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label={t('news.content')} required>
                        <Editor
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8} xl={8}>
                    <Form.Item name="status" label={t('news.status')} required>
                        <Select options={[{ label: t('news.status.active'), value: 'active' }, { label: t('news.status.inactive'), value: 'inactive' }]} />
                    </Form.Item>
                    <Form.Item name="publishDate" label={t('news.publishDate')} required>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="thumbnail" label={t('news.thumbnail')} required>
                        <Upload>
                            <Button icon={<UploadOutlined />}>{t('news.uploadThumbnail')}</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="category" label={t('news.category')} required>
                        <Select options={[{ label: t('news.category.active'), value: 'active' }, { label: t('news.category.inactive'), value: 'inactive' }]} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default News;