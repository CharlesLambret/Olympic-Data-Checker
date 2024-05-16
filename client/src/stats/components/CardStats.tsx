import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

const data = [
  {
    country: "USA",
    medals: 100,
  },
  {
    country: "China",
    medals: 80,
  },
  {
    country: "Russia",
    medals: 70,
  },
  {
    country: "UK",
    medals: 50,
  },
  {
    country: "France",
    medals: 40,
  },
  {
    country: "Germany",
    medals: 30,
  },
  {
    country: "Italy",
    medals: 20,
  },
  {
    country: "Spain",
    medals: 10,
  },
];

export function CardsStats() {
  return (
    <div
      className="grid grid-cols-2"
      style={{
        height: "calc(100vh - 126px)",
      }}
    >
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$15,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="revenue"
                  activeDot={{
                    r: 6,
                    style: { fill: "hsl(var(--primary))", opacity: 0.25 },
                  }}
                  style={
                    {
                      stroke: "hsl(var(--primary))",
                    } as React.CSSProperties
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="h-auto col-span-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
          <div
            className="mt-4"
            style={{
              height: "calc(100vh - 256px)",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Tooltip cursor={{ fill: "#f1f5f9" }} />
                <XAxis dataKey="country" />
                <Bar
                  dataKey="medals"
                  style={
                    {
                      fill: "hsl(var(--primary))",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="subscription"
                  style={
                    {
                      fill: "hsl(var(--primary))",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
