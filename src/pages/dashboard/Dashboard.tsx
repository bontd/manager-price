import { useQuery } from '@tanstack/react-query';
import { Skeleton, Table } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import configs from '../../utils/constants/config';
import { useUserList } from '@/hook/useUserList';

export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const { data, isLoading, error } = useUserList({current:1,pageSize:2});
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
            title: t('table.label.phone'),
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    const dataColumns = data?.map((item: any) => ({
        ...item,
        key: item.id
    })) || [];

    if (error) return <p>{t('axios.error.label')}: {error.message}</p>;

    return (
        <div className="card">
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
                <Table dataSource={dataColumns} columns={columns} />
            )}
        </div>
    )
}
