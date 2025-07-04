import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, DatePicker, Switch, Upload, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Expense } from '@/hook/useExpenses';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useExpenses } from '@/hook/useExpenses';
import { useExpenseCategories } from '@/hook/useExpenseCategories';
import ClockTimePicker from '@/components/ClockTimePicker';

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
  } = useExpenses({});
  
  const { list: categories, isLoading: categoriesLoading } = useExpenseCategories({ enabled: open });

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
        
        const expenseDate = initialValues.expense_date ? dayjs(initialValues.expense_date) : dayjs();
        
        form.setFieldsValue({
          title: initialValues.title,
          description: initialValues.description,
          amount: initialValues.amount,
          category_id: initialValues?.category?.id,
          payment_method: initialValues.payment_method,
          location: initialValues.location,
          receipt_image: initialValues.receipt_image,
          expense_date: expenseDate,
          expense_time: { hour: expenseDate.hour(), minute: expenseDate.minute() },
          expense_hour: expenseDate.hour(),
          expense_minute: expenseDate.minute()
        });
      } else if (mode === 'create') {
        // Reset form first, then set default date
        form.resetFields();
        const now = dayjs();
        form.setFieldsValue({ 
          expense_date: now,
          expense_time: { hour: now.hour(), minute: now.minute() },
          expense_hour: now.hour(),
          expense_minute: now.minute()
        });
      }
    }
  }, [open, mode, initialValues, form]);

  const handleOk = async (values: any) => {
    try {
      let submitData = values;

      // Combine date and time (always do this first)
      let combinedDateTime = null;
      if (
        values.expense_date &&
        (values.expense_hour !== undefined && values.expense_minute !== undefined)
      ) {
        const date = dayjs(values.expense_date);
        combinedDateTime = date
          .hour(values.expense_hour)
          .minute(values.expense_minute)
          .second(0)
          .format('YYYY-MM-DD HH:mm:ss');
      } else if (
        values.expense_date &&
        values.expense_time &&
        typeof values.expense_time.hour === 'number' &&
        typeof values.expense_time.minute === 'number'
      ) {
        const date = dayjs(values.expense_date);
        combinedDateTime = date
          .hour(values.expense_time.hour)
          .minute(values.expense_time.minute)
          .second(0)
          .format('YYYY-MM-DD HH:mm:ss');
      }

      // Handle file upload
      if (values.receipt_image && Array.isArray(values.receipt_image) && values.receipt_image.length > 0) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'receipt_image') {
            const fileList = value as any[];
            if (Array.isArray(fileList) && fileList[0] && fileList[0].originFileObj) {
              formData.append('receipt_image', fileList[0].originFileObj);
            }
          } else if (
            key === 'expense_date' ||
            key === 'expense_hour' ||
            key === 'expense_minute' ||
            key === 'expense_time'
          ) {
            // Skip these fields as we'll add the combined datetime
          } else if (value !== undefined && value !== null) {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
              formData.append(key, value.toString());
            }
          }
        });
        // Always append the combined expense_date string
        formData.append('expense_date', combinedDateTime);
        submitData = formData;
      } else {
        // Remove separate date and time fields, add combined datetime
        const { expense_date, expense_hour, expense_minute, expense_time, ...restValues } = values;
        submitData = { ...restValues, expense_date: combinedDateTime };
      }

      if (mode === 'edit') {
        await update({ ...submitData, id: initialValues?.id }, {
          onSuccess: (data: any) => {
            form.resetFields();
            onClose();
          }
        });
      } else {
        await create(submitData, {
          onSuccess: (data: any) => {
            form.resetFields();
            onClose();
          }
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
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
        form={form}
        onFinish={handleOk}
      >
        <Form.Item name="title" className='mb-[10px]' label={t('expenses.title')} rules={[{ required: true, message: t('expenses.titleRequired') }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" className='mb-[10px]' label={t('expenses.description')}>
          <Input />
        </Form.Item>
        <Form.Item name="amount" className='mb-[10px]' label={t('expenses.amount')} rules={[{ required: true, message: t('expenses.amountRequired') }]}>
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item name="category_id" className='mb-[10px]' label={t('expenses.category')} rules={[{ required: true, message: t('expenses.categoryRequired') }]}>
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
        <Row className='flex justify-between mb-[10px]'>
          <Form.Item name="expense_date" className='w-[65%] mb-[0]' label={t('expenses.date')} rules={[{ required: true, message: t('expenses.dateRequired') }]}>
            <DatePicker style={{ width: '100%' }} inputReadOnly />
          </Form.Item>
          <Form.Item name="expense_time" className='w-[30%] mb-[0]' label={t('expenses.time')} rules={[{ required: true, message: t('expenses.timeRequired') }]}>
            <ClockTimePicker 
              placeholder={t('expenses.selectTime')}
              onChange={(time) => {
                form.setFieldsValue({
                  expense_hour: time.hour,
                  expense_minute: time.minute
                });
              }}
            />
          </Form.Item>
        </Row>
        <Form.Item name="payment_method" className='mb-[10px]' label={t('expenses.paymentMethod')}>
          <Select>
            {paymentMethods.map((method) => (
              <Select.Option key={method.id} value={method.name}>{method.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="location" className='mb-[10px]' label={t('expenses.location')}>
          <Input />
        </Form.Item>
        <Form.Item name="receipt_image" className='mb-[10px]' label={t('expenses.receiptImage')} valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
          <Upload name="receipt" listType="picture" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>{t('expenses.receiptImage')}</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="is_recurring" className='mb-[10px]' label={t('expenses.isRecurring')} valuePropName="checked">
          <Switch />
        </Form.Item>
        {/* <Form.Item name="recurring_type" className='mb-[10px]' label={t('expenses.recurringType')}>
          <Input />
        </Form.Item> */}
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