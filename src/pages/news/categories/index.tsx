import TableComponent from "@/components/table";
import useNewsCategories from "@/hook/useNewsCategories";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const NewsCategories = () => {
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const { data, isLoading, meta } = useNewsCategories(pagination);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];

    return (
        <>
            <Row justify="end" className="mb-[16px]">
                <Button type="primary" onClick={() => {
                    console.log('aaaa');
                }}>
                    {t('newsCategories.create')}
                </Button>
            </Row>
            <TableComponent
                dataSource={data}
                columns={columns}
                meta={meta}
                isLoading={isLoading}
                setPagination={setPagination}
                t={t}
            />
        </>
    )
}

export default NewsCategories;