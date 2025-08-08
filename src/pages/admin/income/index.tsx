import { Button, Popconfirm, Table } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import useIncome from "@/hook/useIncome";
import TableComponent from "@/components/table";
import IncomeCreate from "./create";
import { formatCurrency } from "@/utils/helper";

const IncomePage = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
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
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('income.amount'),
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => (
                <span>{formatCurrency(amount)}</span>
            )
        },
        {
            title: t('income.date'),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: t('table.actions'),
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            width: 150,
            fixed: 'right',
            render: (text: string, record: any) => (
                <div className="flex justify-end gap-[10px]">
                    <Button icon={<EditOutlined />} onClick={() => setOpen(true)} />
                    <Popconfirm 
                        title={t('income.deleteIncome')} 
                        onConfirm={() => {}}
                        okText={t('common.ok')}
                        cancelText={t('common.cancel')}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </div>
            )
        }
    ]

    return (
        <div>
            <div className="flex justify-end mb-[20px]">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>{t('income.createIncome')}</Button>
            </div>
            <TableComponent 
                dataSource={data}
                columns={columns}
                meta={meta}
                isLoading={isLoading}
                setPagination={setPagination}
                t={t}
            />
            <IncomeCreate open={open} onCancel={() => setOpen(false)} />
        </div>
    )
}

export default IncomePage;