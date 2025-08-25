import React, { useEffect } from 'react';
import { Form, Select, DatePicker, InputNumber, Row, Col, Button, Space, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useExpenseCategories } from '@/hook/useExpenseCategories';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { ExpenseStatisticsFilters } from '@/hook/useExpenseStatistics';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DashboardFilterFormProps {
  form: any;
  onFinish: (values: any) => void;
  onReset: () => void;
  filters: ExpenseStatisticsFilters;
}

const DashboardFilterForm: React.FC<DashboardFilterFormProps> = ({ 
  form, 
  onFinish, 
  onReset, 
  filters 
}) => {
  const { t } = useTranslation();
  
  // Get expense categories for filter dropdown
  const { list: categories } = useExpenseCategories();

  // Set default form values
  useEffect(() => {
    form.setFieldsValue({
      period: filters.period || 'month',
      date_range: filters.start_date && filters.end_date ? [
        dayjs(filters.start_date),
        dayjs(filters.end_date)
      ] : undefined,
      category: filters.category || undefined,
      payment_method: filters.payment_method || undefined,
      min_amount: filters.min_amount || undefined,
      max_amount: filters.max_amount || undefined,
    });
  }, [form, filters]);

  const handleFinish = (values: any) => {
    const newFilters: ExpenseStatisticsFilters = {
      period: values.period || 'month',
    };

    // Handle date range
    if (values.date_range && values.date_range.length === 2) {
      newFilters.start_date = values.date_range[0].format('YYYY-MM-DD HH:mm:ss');
      newFilters.end_date = values.date_range[1].format('YYYY-MM-DD HH:mm:ss');
    }

    // Handle other filters
    if (values.category) newFilters.category = values.category;
    if (values.payment_method) newFilters.payment_method = values.payment_method;
    if (values.min_amount) newFilters.min_amount = values.min_amount;
    if (values.max_amount) newFilters.max_amount = values.max_amount;

    onFinish(newFilters);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Card className='mb-[20px]'>
      <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
      >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="period" label={t('dashboard.filters.period')}>
                <Select placeholder={t('dashboard.filters.selectPeriod')}>
                    <Option value="week">{t('dashboard.periods.week')}</Option>
                    <Option value="month">{t('dashboard.periods.month')}</Option>
                    <Option value="year">{t('dashboard.periods.year')}</Option>
                    <Option value="all">{t('dashboard.periods.all')}</Option>
                </Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="date_range" label={t('dashboard.filters.dateRange')}>
                <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={[t('dashboard.filters.startDate'), t('dashboard.filters.endDate')]}
                    style={{ width: '100%' }}
                />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="category" label={t('dashboard.filters.category')}>
                <Select
                    placeholder={t('dashboard.filters.selectCategory')}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                >
                    {categories?.map((category: any) => (
                    <Option key={category.id} value={category.id}>
                        {category.name}
                    </Option>
                    ))}
                </Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="payment_method" label={t('dashboard.filters.paymentMethod')}>
                <Select
                    placeholder={t('dashboard.filters.selectPaymentMethod')}
                    allowClear
                >
                    <Option value="cash">{t('expenses.paymentMethods.cash')}</Option>
                    <Option value="bank_transfer">{t('expenses.paymentMethods.bankTransfer')}</Option>
                    <Option value="card">{t('expenses.paymentMethods.card')}</Option>
                    <Option value="digital_wallet">{t('expenses.paymentMethods.digitalWallet')}</Option>
                </Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="min_amount" label={t('dashboard.filters.minAmount')}>
                <InputNumber
                    placeholder={t('dashboard.filters.minAmountPlaceholder')}
                    style={{ width: '100%' }}
                    min={0}
                />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="max_amount" label={t('dashboard.filters.maxAmount')}>
                <InputNumber
                    placeholder={t('dashboard.filters.maxAmountPlaceholder')}
                    style={{ width: '100%' }}
                    min={0}
                />
                </Form.Item>
            </Col>
          </Row>
          <Row>
          <Col span={24}>
              <Space>
              <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                  {t('dashboard.filters.apply')}
              </Button>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  {t('dashboard.filters.reset')}
              </Button>
              </Space>
          </Col>
          </Row>
      </Form>
    </Card>
  );
};

export default DashboardFilterForm; 