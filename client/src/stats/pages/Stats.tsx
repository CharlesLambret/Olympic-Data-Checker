import React from "react";
import { CardsStats } from "../components/CardStats";
import { TableMedals } from "../components/TableMedals";

const Stats: React.FC = () => {
  return (
    <div className="mx-5">
      <CardsStats />
      {/* <TableMedals /> */}
    </div>
  );
};

export default Stats;
