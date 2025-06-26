import React from 'react';
import { Card } from 'antd';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface BarChartProps {
  title?: string;
  data: DataPoint[];
  dataKeys: string[];
  colors?: string[];
  height?: number;
  loading?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  dataKeys,
  colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d'],
  height = 300,
  loading = false,
  showGrid = true,
  showLegend = true,
  horizontal = false
}) => {
  return (
    <Card
      title={title}
      loading={loading}
      className="chart-card"
      bodyStyle={{ padding: '20px' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarChart; 