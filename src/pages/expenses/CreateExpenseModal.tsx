import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, DatePicker, Switch, Upload, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Expense } from '@/hook/useExpenses';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useExpenses } from '@/hook/useExpenses';
import { useExpenseCategories } from '@/hook/useExpenseCategories';
import { toast } from 'react-toastify';

export interface CreateExpenseModalProps {
  open: boolean;
  mode?: 'create' | 'edit';
  initialValues?: Partial<Expense>;
  onClose: () => void;
}

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({
  open,
  mode = 'create',
  initialValues,
  onClose
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const {
    create,
    isCreating,
    update,
    isUpdating
  } = useExpenses();
  
  const { list: categories, isLoading: categoriesLoading } = useExpenseCategories();

  const paymentMethods = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Bank Transfer' },
    { id: 3, name: 'Credit Card' },
    { id: 4, name: 'Debit Card' },
    { id: 5, name: 'Other' }
  ];

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialValues) {
        console.log(initialValues);
        
        form.setFieldsValue({
          title: initialValues.title,
          description: initialValues.description,
          amount: initialValues.amount,
          category_id: initialValues?.category?.id,
          payment_method: initialValues.payment_method,
          location: initialValues.location,
          receipt_image: initialValues.receipt_image,
          expense_date: initialValues.expense_date ? dayjs(initialValues.expense_date) : dayjs()
        });
      } else if (mode === 'create') {
        // Reset form first, then set default date
        form.resetFields();
        form.setFieldsValue({ expense_date: dayjs() });
      }
    }
  }, [open, mode, initialValues, form]);

  const handleOk = async (values: any) => {
    try {
      let submitData = values;
      // Handle file upload
      if (values.receipt_image && Array.isArray(values.receipt_image) && values.receipt_image.length > 0) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'receipt_image') {
            const fileList = value as any[];
            if (Array.isArray(fileList) && fileList[0] && fileList[0].originFileObj) {
              formData.append('receipt_image', fileList[0].originFileObj);
            }
          } else if (value !== undefined && value !== null) {
            if (
              key === 'expense_date' &&
              typeof value === 'object' &&
              value !== null &&
              typeof (value as any).toISOString === 'function'
            ) {
              formData.append('expense_date', (value as any).format('YYYY-MM-DD HH:mm:ss'));
            } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
              formData.append(key, value.toString());
            }
          }
        });
        submitData = formData;
      } else if (
        values.expense_date &&
        typeof values.expense_date === 'object' &&
        values.expense_date !== null &&
        typeof (values.expense_date as any).toISOString === 'function'
      ) {
        submitData = { ...values, expense_date: (values.expense_date as any).format('YYYY-MM-DD HH:mm:ss') };
      }
      
      if (mode === 'edit') {
        await update({...submitData, id: initialValues?.id }, {
          onSuccess: (data: any) => {
            toast.success(t('expenses.updateSuccess'));
            form.resetFields();
            onClose();
          }
        });
      } else {
        await create(submitData, {
          onSuccess: (data: any) => {
            toast.success(t('expenses.createSuccess'));
            form.resetFields();
            onClose();
          }
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(t('expenses.saveError'));
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={mode === 'edit' ? t('expenses.editTitle') : t('expenses.createTitle')}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="createExpense"
        layout="vertical" 
        onFinish={handleOk}
        form={form}
      >
        <Form.Item name="title" label={t('expenses.title')} rules={[{ required: true, message: t('expenses.titleRequired') }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label={t('expenses.description')}>
          <Input />
        </Form.Item>
        <Form.Item name="amount" label={t('expenses.amount')} rules={[{ required: true, message: t('expenses.amountRequired') }]}>
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item name="category_id" label={t('expenses.category')} rules={[{ required: true, message: t('expenses.categoryRequired') }]}>
          <Select
            placeholder={t('expenses.selectCategory')}
            loading={categoriesLoading}
            showSearch
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {categories?.map((category: any) => (
              <Select.Option key={category.id} value={category.id} label={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="expense_date" label={t('expenses.date')} rules={[{ required: true, message: t('expenses.dateRequired') }]}>
          <DatePicker style={{ width: '100%' }} showTime />
        </Form.Item>
        <Form.Item name="payment_method" label={t('expenses.paymentMethod')}>
          <Select>
            {paymentMethods.map((method) => (
              <Select.Option key={method.id} value={method.name}>{method.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="location" label={t('expenses.location')}>
          <Input />
        </Form.Item>
        <Form.Item name="receipt_image" label={t('expenses.receiptImage')} valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
          <Upload name="receipt" listType="picture" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>{t('expenses.receiptImage')}</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="is_recurring" label={t('expenses.isRecurring')} valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="recurring_type" label={t('expenses.recurringType')}>
          <Input />
        </Form.Item>
        <Row className='flex justify-between'>
          <Button onClick={handleCancel} disabled={isCreating || isUpdating}>{t('common.cancel')}</Button>
          <Button type="primary" loading={isCreating || isUpdating} htmlType="submit">
            {mode === 'edit' ? t('common.save') : t('common.create')}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateExpenseModal; 