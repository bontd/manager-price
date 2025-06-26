import { useState, useEffect } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  RiseOutlined 
} from '@ant-design/icons';
import { StatsGrid } from '@/components/stats';
import { LineChart, BarChart, PieChart } from '@/components/charts';

export default function Dashboard() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    // Mock data for stats
    const statsData = [
        {
            title: 'Tổng doanh thu',
            value: 12500000,
            prefix: <DollarOutlined />,
            suffix: ' VNĐ',
            icon: <DollarOutlined />,
            trend: { value: 12.5, isPositive: true },
            color: '#52c41a'
        },
        {
            title: 'Đơn hàng',
            value: 1250,
            prefix: '',
            suffix: '',
            icon: <ShoppingCartOutlined />,
            trend: { value: 8.2, isPositive: true },
            color: '#1890ff'
        },
        {
            title: 'Khách hàng',
            value: 850,
            prefix: '',
            suffix: '',
            icon: <UserOutlined />,
            trend: { value: 15.3, isPositive: true },
            color: '#722ed1'
        },
        {
            title: 'Tăng trưởng',
            value: 23.5,
            prefix: '',
            suffix: '%',
            icon: <RiseOutlined />,
            trend: { value: 5.2, isPositive: true },
            color: '#faad14'
        }
    ];

    // Mock data for line chart
    const lineChartData = [
        { name: 'T1', doanhThu: 4000, donHang: 2400 },
        { name: 'T2', doanhThu: 3000, donHang: 1398 },
        { name: 'T3', doanhThu: 2000, donHang: 9800 },
        { name: 'T4', doanhThu: 2780, donHang: 3908 },
        { name: 'T5', doanhThu: 1890, donHang: 4800 },
        { name: 'T6', doanhThu: 2390, donHang: 3800 },
        { name: 'T7', doanhThu: 3490, donHang: 4300 },
    ];

    // Mock data for bar chart
    const barChartData = [
        { name: 'SP A', soLuong: 4000, gia: 2400 },
        { name: 'SP B', soLuong: 3000, gia: 1398 },
        { name: 'SP C', soLuong: 2000, gia: 9800 },
        { name: 'SP D', soLuong: 2780, gia: 3908 },
        { name: 'SP E', soLuong: 1890, gia: 4800 },
    ];

    // Mock data for pie chart
    const pieChartData = [
        { name: 'Sản phẩm A', value: 400 },
        { name: 'Sản phẩm B', value: 300 },
        { name: 'Sản phẩm C', value: 300 },
        { name: 'Sản phẩm D', value: 200 },
    ];

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">Tổng quan về hoạt động kinh doanh</p>
            </div>

            {/* Stats Cards */}
            <StatsGrid stats={statsData} columns={4} />

            {/* Charts Section */}
            <Row gutter={[16, 16]} className="mb-[10px]">
                <Col xs={24} lg={12}>
                    <LineChart
                        title="Biểu đồ doanh thu theo tháng"
                        data={lineChartData}
                        dataKeys={['doanhThu', 'donHang']}
                        colors={['#1890ff', '#52c41a']}
                        height={300}
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <BarChart
                        title="Thống kê sản phẩm"
                        data={barChartData}
                        dataKeys={['soLuong', 'gia']}
                        colors={['#722ed1', '#faad14']}
                        height={300}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <PieChart
                        title="Phân bố sản phẩm"
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        height={300}
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Thông tin nhanh" className="h-full">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <span className="text-gray-700">Đơn hàng mới</span>
                                <span className="font-bold text-blue-600">25</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <span className="text-gray-700">Đã giao hàng</span>
                                <span className="font-bold text-green-600">18</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                <span className="text-gray-700">Đang xử lý</span>
                                <span className="font-bold text-yellow-600">7</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                <span className="text-gray-700">Cần hỗ trợ</span>
                                <span className="font-bold text-red-600">3</span>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
