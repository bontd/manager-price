import React from 'react';
import { Row, Col } from 'antd';
import StatsCard from './StatsCard';

interface StatsData {
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

interface StatsGridProps {
  stats: StatsData[];
  columns?: number;
  gutter?: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ 
  stats, 
  columns = 4, 
  gutter = 16 
}) => {
  const span = 24 / columns;

  return (
    <Row gutter={gutter} className="mb-[10px]">
      {stats.map((stat, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={span} xl={span}>
          <StatsCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default StatsGrid; 