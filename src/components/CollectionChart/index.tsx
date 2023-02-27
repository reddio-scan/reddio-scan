import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import numeral from 'numeral';
import SkeletonChart from '../UI/Skeleton/chart';
import { Box } from '@chakra-ui/react';
const CollectionChart = () => {
  const [data, setData] = useState<
    Array<{
      month: string;
      sales: number;
      currency: string;
    }>
  >();
  useEffect(() => {
    // settimeout to simulate api call
    setTimeout(
      () =>
        setData([
          { month: 'Jan', sales: 12000, currency: 'USD' },
          { month: 'Feb', sales: 10000, currency: 'USD' },
          { month: 'Mar', sales: 15000, currency: 'USD' },
          { month: 'Apr', sales: 19000, currency: 'USD' },
          { month: 'May', sales: 22000, currency: 'USD' },
          { month: 'Jun', sales: 24000, currency: 'USD' },
          { month: 'Jul', sales: 21000, currency: 'USD' },
          { month: 'Aug', sales: 19000, currency: 'USD' },
          { month: 'Sep', sales: 25000, currency: 'USD' },
          { month: 'Oct', sales: 28000, currency: 'USD' },
          { month: 'Nov', sales: 30000, currency: 'USD' },
          { month: 'Dec', sales: 27000, currency: 'USD' },
        ]),
      1000,
    );
  }, []);

  return (
    <>
      <Box width="container.md">
        {data == null ? (
          <SkeletonChart />
        ) : (
          <BarChart
            width={750}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 0,
            }}
            barGap={5}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: '12px' }} />
            <YAxis
              label={{
                value: 'Volume',
                angle: -90,
                position: 'outside',
                dx: -20,
                dy: 20,
              }}
              tickFormatter={(value) => numeral(value).format('$0,0a')}
              tick={{ fontSize: '12px' }}
            />
            <Tooltip
              labelFormatter={(label: string) => `${label} (USD)`}
              formatter={(value) => numeral(value).format('$0,0.00')}
              labelStyle={{ fontSize: '12px' }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#034586" barSize={15} />
          </BarChart>
        )}
      </Box>
    </>
  );
};

export default CollectionChart;
