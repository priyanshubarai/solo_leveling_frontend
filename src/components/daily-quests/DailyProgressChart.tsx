import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface ChartPoint {
  name: string;
  pct: number;
}

interface DailyProgressChartProps {
  chartData: ChartPoint[];
  daysInMonth: number;
}

const DailyProgressChart = ({ chartData, daysInMonth }: DailyProgressChartProps) => (
  <div className="glass-panel p-6">
    <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily Progress</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "hsl(220 10% 55%)" }}
          axisLine={false}
          tickLine={false}
          interval={Math.floor(daysInMonth / 7)}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "hsl(220 10% 55%)" }}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(240 10% 8%)",
            border: "1px solid hsl(270 40% 25%)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "hsl(220 20% 90%)" }}
          formatter={(value: number) => [`${value}%`, "Completion"]}
        />
        <Line
          type="monotone"
          dataKey="pct"
          stroke="hsl(200 100% 55%)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "hsl(200 100% 55%)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default DailyProgressChart;
