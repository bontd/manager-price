import useIncomeCategories from "@/hook/useIncomeCategories";
import { Button, Form, Input, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


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
                    <Button size="small" danger><DeleteOutlined /></Button>
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
        <div className="flex items-start gap-[40px]">
            <div className="w-[300px]">
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label={t('incomeCategory.name')} rules={[{ required: true, message: t('validation.required') }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label={t('incomeCategory.description')}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="color" label={t('incomeCategory.color')}>
                        <Input type="color" className="w-[50px]" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{t('button.save')}</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="w-[calc(100%-300px)] border border-[#e0e0e0] rounded-md">
                <Table 
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    pagination={{
                        current: meta?.currentPage || 1,
                        pageSize: meta?.perPage || 10,
                        total: meta?.totalCount || 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
                        pageSizeOptions: ['5', '10', '20', '50'],
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default IncomeCategory;