import useIncomeCategories from "@/hook/useIncomeCategories";
import { Button, Form, Input, Popconfirm, Space, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TableComponent from "@/components/table";

const IncomeCategory = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { list: data, meta, isLoading, isError, error, incomeCategoryCreate, incomeCategoryUpdate, incomeCategoryDelete } = useIncomeCategories({
        current: pagination.current,
        pageSize: pagination.pageSize,
    });

    const columns = [
        {
            title: t('incomeCategory.name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('incomeCategory.description'),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: t('common.action'),
            dataIndex: 'action',
            key: 'action',
            align: 'right' as const,
            render: (text: string, record: any) => (
                <div className="flex gap-[10px] justify-end">
                    <Button size="small"><EditOutlined /></Button>
                    <Popconfirm 
                        title="Are you sure you want to delete this item?" 
                        onConfirm={() => incomeCategoryDelete.mutate(record.id)}
                        okText={t('common.delete')}
                        cancelText={t('common.cancel')}
                    >
                        <Button size="small" danger loading={incomeCategoryDelete.isPending}><DeleteOutlined /></Button>
                    </Popconfirm>
                </div>
            ),
        }
    ];

    const onFinish = async (values: any) => {
        try {
            await incomeCategoryCreate.mutateAsync(values, {
                onSuccess: () => {
                    form.resetFields();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Row gutter={24} className="items-start">
            <Col xs={24} lg={8} className="flex flex-col">
                <Space direction="vertical">
                    <Card>
                        <Form form={form} onFinish={onFinish} layout="vertical" className="w-[100%]">
                            <Form.Item name="name" label={t('incomeCategory.name')} rules={[{ required: true, message: t('validation.required') }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label={t('incomeCategory.description')}>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item name="color" label={t('incomeCategory.color')}>
                                <Input type="color" className="w-[50px]" />
                            </Form.Item>
                            <Form.Item className="!mb-[0]">
                                <Button type="primary" htmlType="submit" loading={incomeCategoryCreate.isPending} disabled={incomeCategoryCreate.isPending}>{t('button.save')}</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Col>
            <Col xs={24} lg={16} className="!p-[0]">
                <Space direction="vertical" className="w-[100%]">
                    <Card>
                        <TableComponent 
                            dataSource={data}
                            columns={columns}
                            meta={meta as any}
                            isLoading={isLoading}
                            setPagination={setPagination}
                        />
                    </Card>
                </Space>
            </Col>
        </Row>
    )
}

export default IncomeCategory;