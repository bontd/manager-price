import { Button, Col, DatePicker, Form, Input, Row, Select, Skeleton, Upload } from "antd";
import { EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Tiptap from "@/components/tiptap";
import dayjs from "dayjs";
import useNewsCategories from "@/hook/useNewsCategories";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { useStatusOptions } from "@/utils/helper/news";
import useNews from "@/hook/useNews";
import { useNavigate, useParams } from "react-router-dom";

const CreateNews = () => {
    const { id } = useParams(); // id is the news id
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: categories, isLoading: isLoadingCategories } = useNewsCategories();
    const { createNews, isCreating, getNews: { data: newsData }, isGettingNews, updateNews, isUpdating } = useNews({}, id);
    const [isDisabledSlug, setIsDisabledSlug] = useState(true);
    const statusOptions = useStatusOptions();
    
    const [form] = Form.useForm();

    // Populate form khi có data từ API (edit mode)
    useEffect(() => {
        if (id && newsData) {
            form.setFieldsValue({
                title: newsData.title,
                slug: newsData.slug,
                content: newsData.content,
                status: newsData.status,
                publishDate: dayjs(newsData.published_at),
                category: newsData.category_id,
                thumbnail: newsData.image,
            });
        }
    }, [id, newsData, form]);

    const onFinish = (values: any) => {
        if (id) {
            updateNews.mutate({
                id: id,
                title: values.title,
                slug: values.slug,
                content: values.content,
                status: values.status,
                published_at: dayjs(values.publishDate).format('YYYY-MM-DD HH:mm:ss'),
                image: values.thumbnail,
                category_id: values.category,
            }, {
                onSuccess: () => {
                    navigate('/news');  
                }
            });
        } else {
            createNews.mutate({
                title: values.title,
                slug: values.slug,
                content: values.content,
                status: values.status,
                published_at: dayjs(values.publishDate).format('YYYY-MM-DD HH:mm:ss'),
                image: values.thumbnail,
                category_id: values.category,
            }, {
                onSuccess: () => {
                    navigate('/news');
                }
            });
        }
    };

    // Loading state cho categories hoặc news data (edit mode)
    if (isLoadingCategories || (id && isGettingNews)) {
        return (
            <Row gutter={24} className='flex gap-y-[20px]'>
                <Col xs={24} lg={16}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Col>
                <Col xs={24} lg={8}>
                    <Skeleton active />
                    <Skeleton active />
                </Col>
            </Row>
        );
    }

    return (
        <div className="px-[16px]">
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col xs={24} lg={16} xl={16} className="!p-[20px] bg-[#ffffff]">
                        <Form.Item 
                            name="title" 
                            label={t('news.title')} 
                            className="!mb-[5px]" 
                            rules={[{ required: true, message: t('validation.required') }]}>
                            <Input
                                onBlur={(e: any) => {
                                    const titleValue = e.target.value;
                                    if (titleValue && typeof titleValue === 'string') {
                                        form.setFieldsValue({
                                            slug: slugify(titleValue, { lower: true, strict: true })
                                        });
                                    }
                                }}
                            />
                        </Form.Item>
                        <div className="w-full flex items-start">
                            <Form.Item name="slug" required className="flex-1">
                                <Input disabled={isDisabledSlug}/>
                            </Form.Item>
                            <Button type="link" onClick={() => setIsDisabledSlug(!isDisabledSlug)} className="!p-[0] ml-[10px]">
                                {isDisabledSlug ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                        </div>
                        <Form.Item 
                            name="content" 
                            label={t('news.content')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            {(() => {
                                const contentValue = form.getFieldValue('content') || '';
                                return (
                                    <Tiptap 
                                        value={contentValue} 
                                        setTiptap={(value: string) => form.setFieldValue('content', value)}
                                    />
                                );
                            })()}
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8} xl={8} className="!pr-[0] flex items-start flex-col flex-wrap gap-[16px]">
                        <div className="w-[100%] !p-[20px] bg-[#ffffff] flex flex-col gap-4">
                            <Form.Item 
                                name="status" 
                                label={t('news.label.status')} 
                                rules={[{ required: true, message: t('validation.required') }]}
                            >
                                <Select options={statusOptions} />
                            </Form.Item>
                            <Form.Item 
                                name="publishDate" 
                                label={t('news.label.publishDate')} 
                                rules={[{ required: true, message: t('validation.required') }]}
                                initialValue={dayjs(new Date())}
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <div className="w-[100%] text-right">
                                <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
                                    {id ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </div>
                        <div className="w-[100%] !p-[20px] bg-[#ffffff] flex flex-col gap-4">
                            <Form.Item name="thumbnail" label={t('news.thumbnail')}>
                                <Upload>
                                    <Button icon={<UploadOutlined />}>{t('news.uploadThumbnail')}</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item 
                                className="!mb-[0]" 
                                name="category" 
                                label={t('news.category')} 
                                rules={[{ required: true, message: t('validation.required') }]}
                            >
                                <Select 
                                    options={categories?.map((category: any) => ({ label: category.name, value: category.id })) || []} 
                                    loading={!categories}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CreateNews;