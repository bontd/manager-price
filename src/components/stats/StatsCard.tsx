import React from 'react';
import { Card, Statistic, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatsCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  icon,
  trend,
  color = '#1890ff',
  loading = false
}) => {
  return (
    <Card
      loading={loading}
      className="stats-card hover:shadow-lg transition-shadow duration-300"
      styles={{ body: { padding: '20px' } }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-gray-500 text-sm mb-2">{title}</div>
          <Statistic
            value={value}
            prefix={prefix}
            suffix={suffix}
            valueStyle={{ 
              color: color,
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          />
          {trend && (
            <div className="mt-2 flex items-center">
              {trend.isPositive ? (
                <ArrowUpOutlined className="text-green-500 mr-1" />
              ) : (
                <ArrowDownOutlined className="text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.value}%
              </span>
              <span className="text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
            style={{ backgroundColor: `${color}15` }}
          >
            <div style={{ color: color, fontSize: '20px' }}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard; 