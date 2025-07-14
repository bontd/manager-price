import { useState, useEffect } from 'react';
import { Button, Skeleton, Space, Table, Tag, Spin, Modal, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserList } from '@/hook/useUserList';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import UserForm from '@/components/UserForm';

const Users = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    const { list: data, meta, isLoading, error, updateStatus, deleteUser } = useUserList({
        current: pagination.current,
        pageSize: pagination.pageSize
    });
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        setLoadingUserId(null);
    }, [data]);

    const columns = [
        {
            title: t('table.label.name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('table.label.status'),
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => (
                record.role != 1 ? (
                <div onClick={() => handleStatus(record.id, record.status)} style={{ cursor: 'pointer' }}>
                    {loadingUserId === record.id ? (
                        <Spin size="small" />
                    ) : record.status == 'active' ? (
                        <CheckCircleOutlined style={{ color: 'green' }}/>
                    ) : (
                        <CloseCircleOutlined style={{ color: 'red' }}/>
                    )}
                </div>
                ) : null
            ),
        },
        {
            title: t('common.action'),
            dataIndex: 'action',
            key: 'action',
            align: 'right' as const,
            fixed: 'right' as const,
            render: (text: string, record: any) => (
                record.role != 1 ? (
                    <Space>
                        <Button size="small" onClick={() => handleEdit(record.id)}><EditOutlined /></Button>
                        <Button size="small" danger onClick={() => handleDelete(record.id)}><DeleteOutlined /></Button>
                    </Space>
                ) : null
            ),
        }
    ];

    const [form] = Form.useForm();

    const dataColumns = (data || []).map((item: any) => ({
        ...item,
        key: item.id,
    }));

    const handleStatus = async (id: string, status: string) => {
        setLoadingUserId(id);
        try {
            await updateStatus(id, status == 'active' ? 'inactive' : 'active');
        } catch (error) {
            setLoadingUserId(null);
        }
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleUpdate = (values: any) => {
        console.log(values);
    };

    const handleDelete = (id: string) => {
        setIsDeleteModalOpen(true);
        setDeleteUserId(id);
    };

    const handleConfirmDelete = () => {
        deleteUser(deleteUserId);
        setIsDeleteModalOpen(false);
        setDeleteUserId(null);
    };

    const handleTableChange = (paginationInfo: any) => {
        setPagination({
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize,
        });
    };

    const handleCreate = () => {
        setIsCreateModalOpen(true);
    };

    if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

    return (
        <div className="card">
            <div className="flex justify-between mb-[20px]">
                <Typography.Title level={5}>{t('users.title')}</Typography.Title>
                <Button type="primary" onClick={handleCreate}>{t('users.createUser')}</Button>
            </div>
            <Table 
                dataSource={dataColumns} 
                columns={columns}
                pagination={{
                    current: meta?.currentPage || 1,
                    pageSize: meta?.perPage,
                    total: meta?.totalCount,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                        `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                onChange={handleTableChange}
                loading={isLoading}
            />
            <Modal
                title="Edit User"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                footer={null}
            >
                <UserForm 
                    onFinish={handleUpdate}
                    showPasswordFields={false}
                    form={form}
                />
            </Modal>
            <Modal
                title="Delete User"
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>,
                    <Button key="delete" danger onClick={handleConfirmDelete}>Delete</Button>
                ]}
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </div>
    )
};

export default Users;