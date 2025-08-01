import { Table } from 'antd';

const TableComponent = (
    {dataSource, columns, meta, isLoading, setPagination, t}: 
    {
        dataSource: any, 
        columns: any, 
        meta?: {
            currentPage?: number,
            perPage?: number,
            totalCount?: number
        }, 
        isLoading?: any, 
        setPagination?: any,
        t?: any
    }
) => {

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                current: meta?.currentPage || 1,
                pageSize: meta?.perPage,
                total: meta?.totalCount,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number, range: number[]) => `${t('table.pagination.showing')} ${range[0]}-${range[1]} ${t('table.pagination.of')} ${total} ${t('table.pagination.items')}`,
                pageSizeOptions: ['5', '10', '20', '50'],
            }}
            loading={isLoading}
            onChange={(pagination: any) => {
                setPagination({
                    current: pagination.current || 1,
                    pageSize: pagination.pageSize || 10,
                });
            }}
            scroll={{ x: 'max-content' }}
        />
    )
}

export default TableComponent;