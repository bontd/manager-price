import React, { useState, useEffect } from 'react';
import { Row, Col, Card, DatePicker, Select, Spin, Tabs } from 'antd';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  RiseOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { StatsGrid } from '@/components/stats';
import { LineChart, BarChart, PieChart } from '@/components/charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default function Analytics() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7d');
    const [chartType, setChartType] = useState('line');

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
            title: 'Khách hàng mới',
            value: 85,
            prefix: '',
            suffix: '',
            icon: <UserOutlined />,
            trend: { value: 15.3, isPositive: true },
            color: '#722ed1'
        },
        {
            title: 'Tỷ lệ chuyển đổi',
            value: 23.5,
            prefix: '',
            suffix: '%',
            icon: <RiseOutlined />,
            trend: { value: 5.2, isPositive: true },
            color: '#faad14'
        }
    ];

    // Mock data for different time ranges
    const getChartData = (range: string) => {
        const data = {
            '7d': [
                { name: 'T1', doanhThu: 4000, donHang: 2400, khachHang: 1200 },
                { name: 'T2', doanhThu: 3000, donHang: 1398, khachHang: 1100 },
                { name: 'T3', doanhThu: 2000, donHang: 9800, khachHang: 900 },
                { name: 'T4', doanhThu: 2780, donHang: 3908, khachHang: 800 },
                { name: 'T5', doanhThu: 1890, donHang: 4800, khachHang: 700 },
                { name: 'T6', doanhThu: 2390, donHang: 3800, khachHang: 600 },
                { name: 'T7', doanhThu: 3490, donHang: 4300, khachHang: 500 },
            ],
            '30d': [
                { name: 'Tuần 1', doanhThu: 15000, donHang: 8000, khachHang: 4000 },
                { name: 'Tuần 2', doanhThu: 18000, donHang: 9500, khachHang: 4500 },
                { name: 'Tuần 3', doanhThu: 22000, donHang: 11000, khachHang: 5000 },
                { name: 'Tuần 4', doanhThu: 25000, donHang: 12500, khachHang: 5500 },
            ],
            '90d': [
                { name: 'Tháng 1', doanhThu: 45000, donHang: 25000, khachHang: 12000 },
                { name: 'Tháng 2', doanhThu: 52000, donHang: 28000, khachHang: 13500 },
                { name: 'Tháng 3', doanhThu: 58000, donHang: 32000, khachHang: 15000 },
            ]
        };
        return data[range as keyof typeof data] || data['7d'];
    };

    // Mock data for product distribution
    const productData = [
        { name: 'Sản phẩm A', value: 400, color: '#1890ff' },
        { name: 'Sản phẩm B', value: 300, color: '#52c41a' },
        { name: 'Sản phẩm C', value: 300, color: '#faad14' },
        { name: 'Sản phẩm D', value: 200, color: '#f5222d' },
        { name: 'Sản phẩm E', value: 150, color: '#722ed1' },
    ];

    // Mock data for sales by category
    const categoryData = [
        { name: 'Điện tử', soLuong: 4000, gia: 2400 },
        { name: 'Thời trang', soLuong: 3000, gia: 1398 },
        { name: 'Gia dụng', soLuong: 2000, gia: 9800 },
        { name: 'Sách', soLuong: 2780, gia: 3908 },
        { name: 'Thể thao', soLuong: 1890, gia: 4800 },
    ];

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value);
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="analytics-page">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Phân tích dữ liệu</h1>
                <p className="text-gray-600">Thống kê chi tiết và biểu đồ phân tích</p>
            </div>

            {/* Controls */}
            <Card className="mb-6">
                <Row gutter={16} align="middle">
                    <Col>
                        <span className="text-gray-700 mr-2">Thời gian:</span>
                        <Select
                            value={timeRange}
                            onChange={handleTimeRangeChange}
                            style={{ width: 120 }}
                        >
                            <Select.Option value="7d">7 ngày</Select.Option>
                            <Select.Option value="30d">30 ngày</Select.Option>
                            <Select.Option value="90d">90 ngày</Select.Option>
                        </Select>
                    </Col>
                    <Col>
                        <RangePicker />
                    </Col>
                </Row>
            </Card>

            {/* Stats Cards */}
            <StatsGrid stats={statsData} columns={4} />

            {/* Charts Tabs */}
            <Card className="mb-6">
                <Tabs defaultActiveKey="1">
                    <TabPane 
                        tab={
                            <span>
                                <LineChartOutlined />
                                Biểu đồ đường
                            </span>
                        } 
                        key="1"
                    >
                        <LineChart
                            title="Xu hướng doanh thu và đơn hàng"
                            data={getChartData(timeRange)}
                            dataKeys={['doanhThu', 'donHang', 'khachHang']}
                            colors={['#1890ff', '#52c41a', '#faad14']}
                            height={400}
                        />
                    </TabPane>
                    
                    <TabPane 
                        tab={
                            <span>
                                <BarChartOutlined />
                                Biểu đồ cột
                            </span>
                        } 
                        key="2"
                    >
                        <BarChart
                            title="Thống kê theo danh mục"
                            data={categoryData}
                            dataKeys={['soLuong', 'gia']}
                            colors={['#722ed1', '#13c2c2']}
                            height={400}
                        />
                    </TabPane>
                    
                    <TabPane 
                        tab={
                            <span>
                                <PieChartOutlined />
                                Biểu đồ tròn
                            </span>
                        } 
                        key="3"
                    >
                        <PieChart
                            title="Phân bố sản phẩm"
                            data={productData}
                            dataKey="value"
                            nameKey="name"
                            height={400}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            {/* Additional Analytics */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Top sản phẩm bán chạy" className="h-full">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                            {item}
                                        </span>
                                        <div>
                                            <div className="font-medium">Sản phẩm {item}</div>
                                            <div className="text-sm text-gray-500">Danh mục {item}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-blue-600">{1000 - item * 100}</div>
                                        <div className="text-sm text-gray-500">đã bán</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                
                <Col xs={24} lg={12}>
                    <Card title="Thống kê theo khu vực" className="h-full">
                        <div className="space-y-4">
                            {[
                                { name: 'Hà Nội', value: 45, color: '#1890ff' },
                                { name: 'TP.HCM', value: 35, color: '#52c41a' },
                                { name: 'Đà Nẵng', value: 20, color: '#faad14' }
                            ].map((region, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-700">{region.name}</span>
                                    <div className="flex items-center">
                                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                            <div 
                                                className="h-2 rounded-full" 
                                                style={{ 
                                                    width: `${region.value}%`, 
                                                    backgroundColor: region.color 
                                                }}
                                            ></div>
                                        </div>
                                        <span className="font-bold" style={{ color: region.color }}>
                                            {region.value}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
} 