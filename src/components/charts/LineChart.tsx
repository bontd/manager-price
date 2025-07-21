import React from 'react';
import { Card } from 'antd';
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  title?: string;
  data: DataPoint[];
  dataKeys: string[];
  colors?: string[];
  height?: number;
  loading?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  dataKeys,
  colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d'],
  height = 300,
  loading = false,
  showGrid = true,
  showLegend = true
}) => {
  return (
    <Card
      title={title}
      loading={loading}
      className="chart-card"
      bodyStyle={{ padding: '10px' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, bottom: 5, left: -10, right: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis tickFormatter={value => value >= 100 ? (value / 1000) + 'k' : value} />
          <Tooltip />
          {showLegend && <Legend />}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChart; 