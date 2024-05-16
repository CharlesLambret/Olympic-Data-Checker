import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { DatePickerWithRange } from "@/components/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Selector"

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
      className="flex flex-row gap-3"
      style={{
        height: "calc(100vh - 126px)",
      }}
    >
      <Card className="flex flex-col basis-1/4 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle> 
              <h2 className="text-2xl font-bold">Filter</h2> 
              <p className="text-xs text-muted-foreground">Chose one or multiple filter</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Country Name</Label>
              <Input type="country" id="country" placeholder="Country" />
            </div>
            <div >
              <Label htmlFor="email">Pick a period</Label>
              <DatePickerWithRange/>
            </div>
            <div>
              <Label htmlFor="email">Pick a medals</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Medals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Gold</SelectItem>
                  <SelectItem value="dark">Silver</SelectItem>
                  <SelectItem value="system">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Button className="w-full">Filtrer</Button>
          </div>
        </CardContent>
      </Card>

      
      <Card className="h-auto col-span-6 basis-3/4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle> 
              <h2 className="text-2xl font-bold">Medals</h2> 
              <p className="text-xs text-muted-foreground"> Top 8 country by medals</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
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
    </div>
  );
}
