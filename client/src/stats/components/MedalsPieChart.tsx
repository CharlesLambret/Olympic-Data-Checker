import Medals1 from "@/athletes/icons/Medals1";
import Medals2 from "@/athletes/icons/Medals2";
import Medals3 from "@/athletes/icons/Medals3";
import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Medals } from "../types/stats";

const data = [
  { name: "Group A", value: 180 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#1B1B70", "#ef4444"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

type Props = {
  medalsLeft: Medals;
  nameLeft: string;
  medalsRight: Medals;
  nameRight: string;
};

const MedalsPieChart = ({
  medalsLeft,
  nameLeft,
  medalsRight,
  nameRight,
}: Props) => {
  console.log(medalsLeft, medalsRight);
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5">
      <div className="flex items-center">
        <Medals1 className="w-10 mr-2" />
        <p>Médailles d'or</p>
      </div>
      <PieChart width={180} height={180}>
        <Pie
          data={[
            { name: nameLeft, value: medalsLeft.gold },
            { name: nameRight, value: medalsRight.gold },
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip cursor={{ fill: "#f1f5f9" }} />
      </PieChart>
      <div className="flex items-center">
        <Medals2 className="w-10 mr-2" />
        <p>Médailles d'argent</p>
      </div>
      <PieChart width={180} height={180}>
        <Pie
          data={[
            { name: nameLeft, value: medalsLeft.silver },
            { name: nameRight, value: medalsRight.silver },
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip cursor={{ fill: "#f1f5f9" }} />
      </PieChart>
      <div className="flex items-center">
        <Medals3 className="w-10 mr-2" />
        <p>Médailles de bronze</p>
      </div>
      <PieChart width={180} height={180}>
        <Pie
          data={[
            { name: nameLeft, value: medalsLeft.bronze },
            { name: nameRight, value: medalsRight.bronze },
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip cursor={{ fill: "#f1f5f9" }} />
      </PieChart>
    </div>
  );
};

export default MedalsPieChart;
