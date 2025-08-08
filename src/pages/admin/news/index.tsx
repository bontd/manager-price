import TableComponent from "@/components/table";
import useNews from "@/hook/useNews";
import getStatusOptions from "@/utils/helper/news";
import { NEW_STATUS } from "@/utils/constants/enum";
import { Button, Col, Popconfirm, Row, Skeleton, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const News = () => { 
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const { data, isLoading, meta, deleteNews, isDeleting, isFetching } = useNews({
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
            render: (text: string) => {
                const status = getStatusOptions({ key: text, t });
                return (
                    <Tag 
                        color={
                            status?.value === NEW_STATUS.PUBLISHED ? 'green' : 
                            status?.value === NEW_STATUS.ARCHIVED ? 'red' : 
                            status?.value === NEW_STATUS.DRAFT ? 'blue' : 'gray'
                        }
                    >
                        {status?.label}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            render: (text: string, record: any) => {
                return (
                    <div className="flex justify-end gap-[10px]">
                        <Button icon={<EditOutlined />} onClick={() => navigate(`/news/edit/${record.id}`)} />
                        <Popconfirm 
                            title="Are you sure you want to delete this news?" 
                            onConfirm={() => {
                                deleteNews.mutate(record.id);
                            }}
                            okText={t('delete')}
                            cancelText={t('cancel')}
                        >
                            <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];

    if (isLoading) {
        return (
            <Row gutter={24}>
                <Col xs={24} lg={24}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Col>
            </Row>
        )
    }

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