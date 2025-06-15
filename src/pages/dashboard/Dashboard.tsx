import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { t, i18n } = useTranslation();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data),
    });

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Có lỗi: {error.message}</p>;

  return (
    <div>
      <p>{t('welcome')}</p>
      <div className="card">
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  )
}
