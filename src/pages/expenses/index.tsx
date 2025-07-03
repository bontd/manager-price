import React, { useEffect, useState, useMemo } from 'react';
import { Table, Skeleton, Button, Space, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import CreateExpenseModal from './CreateExpenseModal';
import { useExpenses, Expense } from '@/hook/useExpenses';
import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/helper';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ExpensesPage: React.FC = () => {
  const { t } = useTranslation();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editValues, setEditValues] = useState<Expense | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const params = useMemo(() => ({
    current: pagination.current,
    pageSize: pagination.pageSize
  }), [pagination.current, pagination.pageSize]);

  const {
    list,
    meta,
    isLoading,
    error,
    remove,
    isRemoving,
    refetch
  } = useExpenses(params);

  const handleEdit = (expense: Expense) => {
    setEditValues(expense);
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

  const handleDelete = (expense: Expense) => {
    setExpenseToDelete(expense);
    setDeleteModalVisible(true);
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

  const handleTableChange = (paginationInfo: any) => {
    setPagination({
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    });
  };

  const columns = [
    { title: t('expenses.title'), dataIndex: 'title', key: 'title' },
    { title: t('expenses.description'), dataIndex: 'description', key: 'description' },
    { title: t('expenses.amount'), dataIndex: 'amount', key: 'amount', render: (amount: number) => formatCurrency(amount) },
    { title: t('expenses.category'), dataIndex: 'category', key: 'category', render: (cat: any, record: Expense) => cat?.name || record.category_id },
    { title: t('expenses.date'), dataIndex: 'expense_date', key: 'expense_date', render: (expense_date: string) => dayjs(expense_date).format('DD/MM/YYYY HH:mm') },
    { title: t('expenses.paymentMethod'), dataIndex: 'payment_method', key: 'payment_method' },
    { title: t('expenses.location'), dataIndex: 'location', key: 'location' },
    {
      title: t('common.action'),
      key: 'action',
      align: 'right' as const,
      fixed: 'right' as const,
      render: (_: any, record: Expense) => (
        <Space className='flex justify-end'>
          <Button size="small" onClick={() => handleEdit(record)}><EditOutlined /></Button>
          <Button size="small" danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
        </Space>
      )
    }
  ];

  const dataSource = (list || []).map((item: Expense) => ({ ...item, key: item.id }));

  if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

  return (
    <div className="card">
      <h2>{t('expenses.title')}</h2>
      <Button type="primary" style={{ marginBottom: 20 }} onClick={handleCreate}>{t('common.create')}</Button>
      <CreateExpenseModal
        open={openCreate}
        mode={modalMode}
        initialValues={editValues || undefined}
        onClose={handleCloseModal}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: meta?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
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
          <p><strong>{expenseToDelete.title}</strong> - {formatCurrency(expenseToDelete.amount)}</p>
        )}
      </Modal>
    </div>
  );
};

export default ExpensesPage;