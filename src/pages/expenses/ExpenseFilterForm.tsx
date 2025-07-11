import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Switch, Row, Col, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useExpenseCategories } from '@/hook/useExpenseCategories';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ExpenseFilterFormProps {
  form: any;
  onFinish: (values: any) => void;
  onReset: () => void;
}

const ExpenseFilterForm: React.FC<ExpenseFilterFormProps> = ({ form, onFinish, onReset }) => {
  const { t } = useTranslation();
  
  // Get expense categories for filter dropdown
  const { list: categories } = useExpenseCategories();

  // Set default form values
  useEffect(() => {
    form.setFieldsValue({
      sort_by: 'expense_date',
      sort_order: 'desc'
    });
  }, [form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ marginBottom: 20 }}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="search" label={t('common.search')}>
            <Input 
              placeholder={t('expenses.searchPlaceholder')} 
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="category" label={t('expenses.category')}>
            <Select
              placeholder={t('expenses.selectCategory')}
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
          <Form.Item name="payment_method" label={t('expenses.paymentMethod')}>
            <Select
              placeholder={t('expenses.selectPaymentMethod')}
              allowClear
            >
              <Option value="cash">{t('expenses.paymentMethods.cash')}</Option>
              <Option value="card">{t('expenses.paymentMethods.card')}</Option>
              <Option value="bank_transfer">{t('expenses.paymentMethods.bankTransfer')}</Option>
              <Option value="digital_wallet">{t('expenses.paymentMethods.digitalWallet')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="location" label={t('expenses.location')}>
            <Input 
              placeholder={t('expenses.locationPlaceholder')}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="date_range" label={t('expenses.dateRange')}>
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={[t('expenses.startDate'), t('expenses.endDate')]}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="min_amount" label={t('expenses.minAmount')}>
            <InputNumber
              placeholder={t('expenses.minAmountPlaceholder')}
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="max_amount" label={t('expenses.maxAmount')}>
            <InputNumber
              placeholder={t('expenses.maxAmountPlaceholder')}
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="is_recurring" label={t('expenses.recurring')} valuePropName="checked">
            <Switch 
              checkedChildren={t('common.yes')} 
              unCheckedChildren={t('common.no')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="sort_by" label={t('common.sortBy')}>
            <Select
              placeholder={t('common.selectSortBy')}
              allowClear
            >
              <Option value="expense_date">{t('expenses.date')}</Option>
              <Option value="amount">{t('expenses.amount')}</Option>
              <Option value="title">{t('expenses.title')}</Option>
              <Option value="created_at">{t('expenses.createdAt')}</Option>
              <Option value="updated_at">{t('expenses.updatedAt')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="sort_order" label={t('common.sortOrder')}>
            <Select
              placeholder={t('common.selectSortOrder')}
              allowClear
            >
              <Option value="asc">{t('common.ascending')}</Option>
              <Option value="desc">{t('common.descending')}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              {t('common.search')}
            </Button>
            <Button onClick={onReset} icon={<ReloadOutlined />}>
              {t('common.reset')}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default ExpenseFilterForm; 