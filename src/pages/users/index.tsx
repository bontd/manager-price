import { useState } from 'react';
import { Button, Skeleton, Space, Table, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserList } from '@/hook/useUserList';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { log } from 'node:console';

const Users = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { list: data, meta, isLoading, error } = useUserList({
        current: pagination.current,
        pageSize: pagination.pageSize
    });

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
        // {
        //     title: t('table.label.address'),
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        {
            title: t('table.label.status'),
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => (
                <div onClick={() => handleStatus(record.id)}>
                    {record.status == 'active' ? 
                    <CheckCircleOutlined style={{ color: 'green' }}/>
                     : 
                    <CloseCircleOutlined style={{ color: 'red' }}/>
                    }
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
                record.role != 1 ? (
                    <Space>
                        <Button size="small" onClick={() => handleEdit(record.id)}><EditOutlined /></Button>
                        <Button size="small" danger onClick={() => handleDelete(record.id)}><DeleteOutlined /></Button>
                    </Space>
                ) : null
            ),
        }
    ];

    const dataColumns = (data || []).map((item: any) => ({
        ...item,
        key: item.id,
    }));

    const handleStatus = (id: string) => {
        console.log(id);
    };

    const handleEdit = (id: string) => {
        console.log(id);
    };

    const handleDelete = (id: string) => {
        console.log(id);
    };

    const handleTableChange = (paginationInfo: any) => {
        setPagination({
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize,
        });
    };

    if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

    return (
        <div className="card">
            <Table 
                dataSource={dataColumns} 
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: meta?.total || 0,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                        `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                onChange={handleTableChange}
                loading={isLoading}
            />
        </div>
    )
};

export default Users;