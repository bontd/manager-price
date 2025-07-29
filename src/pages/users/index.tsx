import { useState, useEffect } from 'react';
import { Button, Skeleton, Space, Table, Tag, Spin, Modal, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/hook/useUser';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import CreateOrEditUser from './createOrEdit';

const Users = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    const { list: data, meta, isLoading, error, updateStatus, deleteUser } = useUser({
        current: pagination.current,
        pageSize: pagination.pageSize
    });
    
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        setLoadingUserId(null);
    }, [data]);

    useEffect(() => {
        if (!isCreateModalOpen) {
            setEditUserId(null);
        }
    }, [isCreateModalOpen]);

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
                <div onClick={() => handleStatus(record.id, record.status)} style={{ cursor: 'pointer' }}>
                    {loadingUserId === record.id ? (
                        <Spin size="small" />
                    ) : record.status == 'active' ? (
                        <CheckCircleOutlined style={{ color: 'green' }}/>
                    ) : (
                        <CloseCircleOutlined style={{ color: 'red' }}/>
                    )}
                </div>
            ),
        },
        {
            title: t('common.action'),
            dataIndex: 'action',
            key: 'action',
            align: 'right' as const,
            fixed: 'right' as const,
            render: (text: string, record: any) => (
                <Space>
                    <Button size="small" onClick={() => {setEditUserId(record.id); setIsCreateModalOpen(true);}}><EditOutlined /></Button>
                    <Button size="small" danger onClick={() => {setIsDeleteModalOpen(true); setDeleteUserId(record.id);}}><DeleteOutlined /></Button>
                </Space>
            ),
        }
    ];

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

    const handleConfirmDelete = () => {
        deleteUser(deleteUserId);
        setIsDeleteModalOpen(false);
        setDeleteUserId(null);
    };

    if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

    return (
        <div className="card !p-[20px] bg-[#ffffff]">
            <div className="flex justify-between mb-[20px]">
                <Typography.Title level={5}>{t('users.title')}</Typography.Title>
                <Button 
                    type="primary" 
                    onClick={() => {
                        setEditUserId(null);
                        setIsCreateModalOpen(true);
                    }}
                >{t('users.createUser')}</Button>
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
                onChange={(pagination) => {
                    setPagination({
                        current: pagination.current || 1,
                        pageSize: pagination.pageSize || 10,
                    });
                }}
                loading={isLoading}
            />
            <CreateOrEditUser 
                type={editUserId ? 'edit' : 'create'} 
                isCreateModalOpen={isCreateModalOpen} 
                setIsCreateModalOpen={setIsCreateModalOpen} 
                initialValues={editUserId ? dataColumns.find((item: any) => item.id === editUserId) : {}} 
            />
            <Modal
                title="Delete User"
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>,
                    <Button key="delete" danger onClick={handleConfirmDelete}>Delete</Button>
                ]}
            >
                <p>{t('users.deleteUserConfirm')}</p>
            </Modal>
        </div>
    )
};

export default Users;