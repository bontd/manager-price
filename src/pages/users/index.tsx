import { useState } from 'react';
import { Skeleton, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserList } from '@/hook/useUserList';

const Users = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { data, isLoading, error } = useUserList({
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
        {
            title: t('table.label.address'),
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const dataColumns = (data?.data || []).map((item: any) => ({
        ...item,
        key: item.id,
    }));

    const handleTableChange = (paginationInfo: any) => {
        setPagination({
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize,
        });
    };

    if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

    return (
        <div className="card">
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
                <Table 
                    dataSource={dataColumns} 
                    columns={columns}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: data?.totalItems || 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                    onChange={handleTableChange}
                />
            )}
        </div>
    )
};

export default Users;