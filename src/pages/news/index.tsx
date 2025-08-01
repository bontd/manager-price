import TableComponent from "@/components/table";
import useNews from "@/hook/useNews";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const News = () => { 
    const { t } = useTranslation();

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { data, isLoading, meta } = useNews({
        current: pagination.current,
        pageSize: pagination.pageSize,
    });

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];
        
    return (
        <>
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

export default News;