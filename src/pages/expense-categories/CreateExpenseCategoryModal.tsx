import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { ExpenseCategory } from '@/hook/useExpenseCategories';

export interface CreateExpenseCategoryModalProps {
  open: boolean;
  mode?: 'create' | 'edit';
  initialValues?: Partial<ExpenseCategory>;
  onClose: () => void;
  onCreate?: (values: any) => void;
  onEdit?: (values: any) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

const CreateExpenseCategoryModal: React.FC<CreateExpenseCategoryModalProps> = ({
  open,
  mode = 'create',
  initialValues,
  onClose,
  onCreate,
  onEdit,
  isLoading,
  isEditing
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (open && mode === 'edit' && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (open && mode === 'create') {
      form.resetFields();
    }
  }, [open, mode, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (mode === 'edit' && onEdit) {
        onEdit({ ...initialValues, ...values });
      } else if (mode === 'create' && onCreate) {
        onCreate(values);
      }
      form.resetFields();
    } catch (err) {}
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={mode === 'edit' ? t('expenseCategories.editTitle') : t('expenseCategories.createTitle')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isLoading || isEditing}>{t('common.cancel')}</Button>,
        <Button key="submit" type="primary" loading={isLoading || isEditing} onClick={handleOk}>
          {mode === 'edit' ? t('common.save') : t('common.create')}
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label={t('expenseCategories.name')} rules={[{ required: true, message: t('expenseCategories.nameRequired') }]}> <Input /> </Form.Item>
        <Form.Item name="description" label={t('expenseCategories.description')}> <Input /> </Form.Item>
        <Form.Item name="color" label={t('expenseCategories.color')}> <Input type="color" /> </Form.Item>
        <Form.Item name="icon" label={t('expenseCategories.icon')}> <Input /> </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateExpenseCategoryModal; 