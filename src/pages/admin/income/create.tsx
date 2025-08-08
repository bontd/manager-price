import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import useIncomeCategories from "@/hook/useIncomeCategories";
import useIncome from "@/hook/useIncome";
import dayjs from "dayjs";

const IncomeCreate = (
    { open, onCancel }: 
    { open: boolean, onCancel: () => void }
) => {
    const { list } = useIncomeCategories();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const { create, isCreating } = useIncome();

    const onFinish = (values: any) => {
        create.mutate(values, {
            onSuccess: () => {
                form.resetFields();
                onCancel();
            }
        });
    }

    return (
        <Modal 
            title={t('income.createIncome')} 
            open={open} 
            onCancel={onCancel}
            footer={
                <div className="flex justify-end gap-[10px]">
                    <Button onClick={onCancel}>{t('common.cancel')}</Button>
                    <Button type="primary" onClick={() => form.submit()} loading={isCreating}>
                        {t('common.save')}
                    </Button>
                </div>
            }
        >
            <div>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item label={t('income.title')} name="title"
                        rules={[{ required: true, message: t('validation.required') }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('income.description')} name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('income.date')} name="income_date"
                        rules={[{ required: true, message: t('validation.required') }]}
                        initialValue={dayjs(new Date())}
                    >
                        <DatePicker 
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </Form.Item>
                    <Form.Item label={t('income.amount')} name="amount"
                        rules={[{ required: true, message: t('validation.required') }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('income.category')} name="category_id"
                        rules={[{ required: true, message: t('validation.required') }]}
                    >
                        <Select options={list.map((item: any) => ({ label: item.name, value: item.id }))} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default IncomeCreate;