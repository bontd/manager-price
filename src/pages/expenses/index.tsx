import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Modal, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import CreateExpenseModal from './CreateExpenseModal';
import ExpenseFilterForm from './ExpenseFilterForm';
import { useExpenses, Expense } from '@/hook/useExpenses';
import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/helper';
import { EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import TableComponent from '@/components/table';

const ExpensesPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editValues, setEditValues] = useState<Expense | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({
    category: '',
    start_date: '',
    end_date: '',
    min_amount: '',
    max_amount: '',
    payment_method: '',
    location: '',
    search: '',
    is_recurring: '',
    sort_by: 'expense_date',
    sort_order: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const params = useMemo(() => ({
    current: pagination.current,
    pageSize: pagination.pageSize,
    ...filters
  }), [pagination.current, pagination.pageSize, filters]);

  const {
    list: data,
    meta,
    isLoading,
    error,
    remove,
    isRemoving
  } = useExpenses(params);

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

  const handleFilterChange = (values: any) => {
    const newFilters = { ...filters };
    
    // Handle date range
    if (values.date_range && values.date_range.length === 2) {
      newFilters.start_date = values.date_range[0].format('YYYY-MM-DD HH:mm:ss');
      newFilters.end_date = values.date_range[1].format('YYYY-MM-DD HH:mm:ss');
    } else {
      newFilters.start_date = '';
      newFilters.end_date = '';
    }

    // Handle other filters
    newFilters.category = values.category || '';
    newFilters.min_amount = values.min_amount || '';
    newFilters.max_amount = values.max_amount || '';
    newFilters.payment_method = values.payment_method || '';
    newFilters.location = values.location || '';
    newFilters.search = values.search || '';
    newFilters.is_recurring = values.is_recurring !== undefined ? (values.is_recurring ? '1' : '0') : '';

    // Handle sort
    newFilters.sort_by = values.sort_by || 'expense_date';
    newFilters.sort_order = values.sort_order || 'desc';

    setFilters(newFilters);
    setPagination({ current: 1, pageSize: pagination.pageSize }); // Reset to first page
  };

  const handleResetFilters = () => {
    form.resetFields();
    setFilters({
      category: '',
      start_date: '',
      end_date: '',
      min_amount: '',
      max_amount: '',
      payment_method: '',
      location: '',
      search: '',
      is_recurring: '',
      sort_by: 'expense_date',
      sort_order: 'desc'
    });
    setPagination({ current: 1, pageSize: pagination.pageSize });
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
          <Button size="small" onClick={() => {
            setEditValues(record);
            setModalMode('edit');
            setOpenCreate(true);
          }}><EditOutlined /></Button>
          <Button size="small" danger onClick={() => {
            setExpenseToDelete(record);
            setDeleteModalVisible(true);
          }}><DeleteOutlined /></Button>
        </Space>
      )
    }
  ];

  if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

  return (
    <div className="card !p-[20px] bg-[#ffffff]">
      <h2>{t('expenses.title')}</h2>
      
      {/* Filter Toggle Button */}
      <div className='flex justify-between items-center' style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => {
          setEditValues(null);
          setModalMode('create');
          setOpenCreate(true);
        }}>{t('common.create')}</Button>
        <Button 
          type={showFilters ? "primary" : "default"}
          icon={<FilterOutlined />}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? t('common.hideFilters') : t('common.showFilters')}
        </Button>
      </div>

      {/* Filter Form */}
      {showFilters && (
        <ExpenseFilterForm
          form={form}
          onFinish={handleFilterChange}
          onReset={handleResetFilters}
        />
      )}
      <CreateExpenseModal
        open={openCreate}
        mode={modalMode}
        initialValues={editValues || undefined}
        onClose={() => {
          setOpenCreate(false);
          setEditValues(null);
        }}
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
          <p><strong>{expenseToDelete.title}</strong> - {formatCurrency(expenseToDelete.amount)}</p>
        )}
      </Modal>
    </div>
  );
};

export default ExpensesPage;