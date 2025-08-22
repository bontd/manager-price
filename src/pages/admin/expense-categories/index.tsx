import React, { useState } from 'react';
import { Table, Skeleton, Button, Space, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import CreateExpenseCategoryModal from './CreateExpenseCategoryModal';
import { useExpenseCategories, ExpenseCategory } from '@/hook/useExpenseCategories';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComponent from '@/components/table';

const ExpenseCategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editValues, setEditValues] = useState<ExpenseCategory | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseCategory | null>(null);

  // Sử dụng custom hook
  const {
    list: data,
    meta,
    isLoading,
    error,
    isCreating,
    isUpdating,
    remove,
    isRemoving
  } = useExpenseCategories(pagination);

  const handleEdit = (cat: ExpenseCategory) => {
    setEditValues(cat);
    setModalMode('edit');
    setOpenCreate(true);
  };

  const handleCreate = () => {
    setEditValues(null);
    setModalMode('create');
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    setEditValues(null);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      remove(expenseToDelete.id, {
        onSuccess: () => {
          setDeleteModalVisible(false);
          setExpenseToDelete(null);
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setExpenseToDelete(null);
  };

  const handleDelete = (data: ExpenseCategory) => {
    setExpenseToDelete(data);
    setDeleteModalVisible(true);
  };

  const columns = [
    { title: t('expenseCategories.name'), dataIndex: 'name', key: 'name' },
    { title: t('expenseCategories.description'), dataIndex: 'description', key: 'description' },
    { title: t('expenseCategories.color'), dataIndex: 'color', key: 'color', render: (color: string) => <span style={{ background: color, padding: '2px 8px' }}>{color}</span> },
    { title: t('expenseCategories.icon'), dataIndex: 'icon', key: 'icon' },
    {
      title: t('common.action'),
      key: 'action',
      align: 'right',
      fixed: 'right',
      render: (_: any, record: ExpenseCategory) => (
        <Space className='flex justify-end'>
          <Button size="small" onClick={() => handleEdit(record)}><EditOutlined /></Button>
          <Button size="small" danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
        </Space>
      )
    }
  ];

  if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

  return (
    <div className="card !p-[20px] bg-[#ffffff]">
      <Button type="primary" style={{ marginBottom: 20 }} onClick={handleCreate}>{t('common.create')}</Button>
      <CreateExpenseCategoryModal
        open={openCreate}
        mode={modalMode}
        initialValues={editValues || undefined}
        onClose={handleCloseModal}
        isLoading={isCreating}
        isEditing={isUpdating}
      />
      
      <TableComponent 
        dataSource={data}
        columns={columns}
        meta={meta}
        isLoading={isLoading}
        setPagination={setPagination}
        t={t}
      />
      <Modal
        title={t('expenses.confirmDelete')}
        open={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmLoading={isRemoving}
        okText={t('common.delete')}
        cancelText={t('common.cancel')}
      >
        <p>{t('expenses.confirmDeleteMessage')}</p>
        {expenseToDelete && (
          <p><strong>{expenseToDelete.name}</strong></p>
        )}
      </Modal>
    </div>
  );
};

export default ExpenseCategoriesPage; 