import { ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import FilterComparison from "./FilterComparison";
import MedalsPieChart from "./MedalsPieChart";
import { useState } from "react";
import { Medals } from "../types/stats";

export function ComparisonContent() {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [medalsLeft, setMedalsLeft] = useState<Medals>({
    gold: 0,
    silver: 0,
    bronze: 0,
  });
  const [medalsRight, setMedalsRight] = useState<Medals>({
    gold: 0,
    silver: 0,
    bronze: 0,
  });

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
          <FilterComparison
            setSelectedFilter={setSelectedLeft}
            setMedals={setMedalsLeft}
          />
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
                <MedalsPieChart
                  medalsLeft={medalsLeft}
                  nameLeft={selectedLeft || ""}
                  medalsRight={medalsRight}
                  nameRight={selectedRight || ""}
                />
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
          <FilterComparison
            setSelectedFilter={setSelectedRight}
            setMedals={setMedalsRight}
          />
        </CardContent>
      </Card>
    </div>
  );
}
