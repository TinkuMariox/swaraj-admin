import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { categorySalesData } from '@/data/mockData';

const COLORS = ['hsl(42 53% 54%)', 'hsl(42 53% 44%)', 'hsl(42 53% 64%)', 'hsl(42 53% 34%)'];

export function CategoryChart() {
  return (
    <div className="luxury-card p-6">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Category-wise Sales</h3>
        <p className="text-sm text-muted-foreground">Sales distribution by product category</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categorySalesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value}%`, 'Sales']}
            />
            <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
              {categorySalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
