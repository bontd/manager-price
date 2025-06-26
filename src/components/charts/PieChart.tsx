import React from 'react';
import { Card } from 'antd';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface PieChartProps {
  title?: string;
  data: DataPoint[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  height?: number;
  loading?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  dataKey,
  nameKey,
  colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'],
  height = 300,
  loading = false,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80
}) => {
  return (
    <Card
      title={title}
      loading={loading}
      className="chart-card"
      bodyStyle={{ padding: '20px' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChart; 