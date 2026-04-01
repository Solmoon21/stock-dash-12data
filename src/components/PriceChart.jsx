import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./PriceChart.scss";

const PriceChart = ({ data }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Price + SMA</h2>
        <p>Closing price with a simple moving average overlay.</p>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-grid)" />
            <XAxis
              dataKey="datetime"
              tick={{ fill: "var(--chart-text)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: "var(--chart-text)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                background: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: 12,
              }}
              labelStyle={{ color: "var(--text-primary)" }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sma"
              stroke="#d48b1f"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
