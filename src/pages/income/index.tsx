import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import useIncome from "@/hook/useIncome";
import TableComponent from "@/components/table";

const IncomePage = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { list: data, meta, isLoading, error, refetch } = useIncome({
        current: pagination.current,
        pageSize: pagination.pageSize,
    });

    const columns = [
        {
            title: t('income.name'),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: t('income.amount'),
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: t('income.date'),
            dataIndex: 'date',
            key: 'date',
        }
    ]

    return (
        <div>
            <div className="flex justify-end mb-[20px]">
                <Button type="primary" icon={<PlusOutlined />}>{t('income.createIncome')}</Button>
            </div>
            <TableComponent 
                dataSource={data}
                columns={columns}
                meta={meta}
                isLoading={isLoading}
                setPagination={setPagination}
                t={t}
            />
        </div>
    )
}

export default IncomePage;