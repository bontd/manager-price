import { useState, useEffect } from 'react';
import { Row, Col, Card, Spin, Select, Alert, Form, Button, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  RiseOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { StatsGrid } from '@/components/stats';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { useExpenseStatistics, ExpenseStatisticsFilters } from '@/hook/useExpenseStatistics';
import DashboardFilterForm from './DashboardFilterForm';

const { Option } = Select;

export default function Dashboard() {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [filters, setFilters] = useState<ExpenseStatisticsFilters>({ period: 'month' });
    const [showFilters, setShowFilters] = useState(false);
    const { statistics, loading, error, refetch } = useExpenseStatistics(filters);

    // Format currency
    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(num);
    };

    // Handle filter changes
    const handleFilterChange = (newFilters: ExpenseStatisticsFilters) => {
        setFilters(newFilters);
    };

    // Handle filter reset
    const handleFilterReset = () => {
        const defaultFilters: ExpenseStatisticsFilters = { period: 'month' };
        setFilters(defaultFilters);
    };

    // Prepare stats data from API
    const statsData = statistics ? [
        {
            title: t('dashboard.stats.totalExpense'),
            value: parseFloat(statistics.total_expense),
            prefix: <DollarOutlined />, 
            suffix: ' VNĐ',
            icon: <DollarOutlined />, 
            trend: { value: 0, isPositive: true },
            color: '#52c41a'
        },
        {
            title: t('dashboard.stats.totalTransactions'),
            value: statistics.expense_count,
            prefix: '',
            suffix: '',
            icon: <ShoppingCartOutlined />, 
            trend: { value: 0, isPositive: true },
            color: '#1890ff'
        },
        // Không còn average_amount, có thể bỏ hoặc tự tính nếu muốn
        {
            title: t('dashboard.stats.categories'),
            value: statistics?.expense_by_category?.length || 0,
            prefix: '',
            suffix: '',
            icon: <RiseOutlined />, 
            trend: { value: 0, isPositive: true },
            color: '#faad14'
        }
    ] : [];

    // Prepare line chart data from daily statistics
    const lineChartData = statistics?.expense_daily_statistics?.map((item: import('@/hook/useExpenseStatistics').ExpenseDailyStatistics) => ({
        name: new Date(item.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        chiTieu: parseFloat(item.total_amount),
        soGiaoDich: item.count
    })) || [];

    // Prepare bar chart data from category statistics
    const barChartData = statistics?.expense_by_category?.map((item: import('@/hook/useExpenseStatistics').ExpenseByCategory) => ({
        name: item.category_name,
        tongTien: parseFloat(item.total_amount),
        soLuong: item.count
    })) || [];

    // Prepare pie chart data from category statistics
    const pieChartData = statistics?.expense_by_category?.map((item: import('@/hook/useExpenseStatistics').ExpenseByCategory) => ({
        name: item.category_name,
        value: parseFloat(item.total_amount)
    })) || [];

    // Prepare payment method statistics
    const paymentMethodData = statistics?.expense_payment_method_statistics?.reduce((acc: Array<{ payment_method: string; total_amount: string; count: number }>, item: import('@/hook/useExpenseStatistics').ExpensePaymentMethodStatistics) => {
        const existing = acc.find(p => p.payment_method === item.payment_method);
        if (existing) {
            existing.total_amount = (parseFloat(existing.total_amount) + parseFloat(item.total_amount)).toString();
            existing.count += item.count;
        } else {
            acc.push({
                payment_method: item.payment_method,
                total_amount: item.total_amount,
                count: item.count
            });
        }
        return acc;
    }, [] as Array<{ payment_method: string; total_amount: string; count: number }>) || [];

    if (loading) {
        return (
            <>
                <Row gutter={24} className='flex gap-y-[20px]'>
                    <Col xs={24} lg={24}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={6}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={6}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={6}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={6}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Skeleton active />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Skeleton active />
                    </Col>
                </Row>
            </>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <Alert
                    message={t('dashboard.errors.loadError')}
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <button 
                            onClick={() => refetch()}
                            className="text-red-600 hover:text-red-800 underline"
                        >
                            {t('dashboard.errors.retry')}
                        </button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="mb-4 md:mb-6">
                <div className="flex justify-between items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">{t('dashboard.title')}</h1>
                        <p className="text-sm md:text-base">{t('dashboard.subtitle')}</p>
                    </div>
                    <Button 
                        type={showFilters ? "primary" : "default"}
                        icon={<FilterOutlined />}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? t('common.hideFilters') : t('common.showFilters')}
                    </Button>
                </div>
            </div>

            {/* Filter Form */}
            {showFilters && (
                <DashboardFilterForm
                    form={form}
                    onFinish={handleFilterChange}
                    onReset={handleFilterReset}
                    filters={filters}
                />
            )}

            {/* Stats Cards */}
            {statistics && <StatsGrid stats={statsData} columns={4} className='mb-[20px] flex gap-y-[10px]' />}

            {/* Charts Section */}
            <Row className='flex-col gap-[20px]'>
                <Row gutter={[16, 16]} className="mb-4">
                    <Col xs={24} lg={12}>
                        <LineChart
                            title={t('dashboard.charts.expenseByDay')}
                            data={lineChartData}
                            dataKeys={['chiTieu', 'soGiaoDich']}
                            colors={['#1890ff', '#52c41a']}
                            height={300}
                        />
                    </Col>
                    <Col xs={24} lg={12}>
                        <BarChart
                            title={t('dashboard.charts.categoryStats')}
                            data={barChartData}
                            dataKeys={['tongTien', 'soLuong']}
                            colors={['#722ed1', '#faad14']}
                            height={300}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <PieChart
                            title={t('dashboard.charts.categoryDistribution')}
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            height={300}
                        />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card 
                            title={t('dashboard.charts.paymentMethodStats')} 
                            className="h-full"
                            bodyStyle={{ padding: '16px' }}
                        >
                            <div className="space-y-3">
                                {paymentMethodData.map((method, index) => (
                                    <div key={method.payment_method} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                        <span className="text-gray-700 text-sm md:text-base">{method.payment_method}</span>
                                        <div className="text-right">
                                            <div className="font-bold text-blue-600 text-sm md:text-base">
                                                {formatCurrency(method.total_amount)}
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-500">
                                                {method.count} {t('dashboard.paymentMethods.transactions')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {paymentMethodData.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        {t('dashboard.paymentMethods.noData')}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </div>
    );
}
