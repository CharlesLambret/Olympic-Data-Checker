import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import FilterComparison from "./FilterComparison";
import MedalsPieChart from "./MedalsPieChart";
import { useState } from "react";

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

export function ComparisonContent() {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  return (
    <div
      className="flex flex-row gap-3"
      style={{
        height: "calc(100vh - 126px)",
      }}
    >
      <Card className="flex flex-col basis-1/4 h-full border-primary/50 bg-primary/3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            <h2 className="text-2xl font-bold">Filters</h2>
            <p className="text-xs text-muted-foreground">
              Chose between tabs to filter
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full p-4">
          <FilterComparison setSelectedFilter={setSelectedLeft} />
        </CardContent>
      </Card>

      <Card className="h-auto col-span-6 basis-2/4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            <h2 className="text-2xl font-bold">
              Medals - {selectedLeft} vs {selectedRight}
            </h2>
            <p className="text-xs text-muted-foreground">
              {" "}
              Top 8 country by medals
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div
            className="mt-4"
            style={{
              height: "calc(100vh - 256px)",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="flex flex-col items-center"
            >
              <>
                <MedalsPieChart />
              </>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col basis-1/4 h-full border-red-500/50 bg-red-500/3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            <h2 className="text-2xl font-bold">Filter</h2>
            <p className="text-xs text-muted-foreground">
              Chose one or multiple filter
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full p-4">
          <FilterComparison setSelectedFilter={setSelectedRight} />
        </CardContent>
      </Card>
    </div>
  );
}
