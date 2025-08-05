import TableComponent from "@/components/table";
import useNewsCategories from "@/hook/useNewsCategories";
import { Button, Col, Modal, Row, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsCategoriesCreate from "./create";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const NewsCategories = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const { data, isLoading, meta, deleteQuery, isDeleting } = useNewsCategories(pagination);
    const [dataEdit, setDataEdit] = useState(null);

    useEffect(() => {
        if (!open && dataEdit) {
            setDataEdit(null);
        }
    }, [open, dataEdit]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            render: (text: string, record: any) => {
                return (
                    <div className="flex items-center justify-end">
                        <Button type="link" onClick={() => {
                            setOpen(true);
                            setDataEdit(record);
                        }}>
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            title={t('newsCategories.deleteTitle')}
                            description={t('newsCategories.deleteContent')}
                            onConfirm={() => {
                                deleteQuery.mutate(record.id);
                            }}
                            okText={t('delete')}
                            cancelText={t('cancel')}
                            okType="danger"
                            okButtonProps={{ loading: isDeleting }}
                            disabled={isDeleting}
                        >
                            <Button type="link" danger loading={isDeleting}>
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];

    return (
        <>
            <Row justify="start" className="mb-[16px]">
                <Button type="primary" onClick={() => {
                    setOpen(true);
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
            <NewsCategoriesCreate open={open} setOpen={setOpen} dataEdit={dataEdit} />
        </>
    )
}

export default NewsCategories;