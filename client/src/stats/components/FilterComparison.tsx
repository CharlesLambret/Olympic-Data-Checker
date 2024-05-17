import { Button } from "@/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useState } from "react";
import AthleteSelect from "./AthleteSelect";
import CountrySelect from "./CountrySelect";
import { Medals } from "../types/stats";

type Props = {
  setSelectedFilter: (selectedFilter: string | null) => void;
  setMedals: (medals: Medals) => void;
};

const FilterComparison = ({ setSelectedFilter, setMedals }: Props) => {
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <>
      <Tabs defaultValue="athlete" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="athlete" className="w-1/2">
            Athlète
          </TabsTrigger>
          <TabsTrigger value="country" className="w-1/2">
            Pays
          </TabsTrigger>
        </TabsList>
        <TabsContent value="athlete">
          <AthleteSelect
            selectedAthlete={selectedAthlete}
            setSelectedAthlete={setSelectedAthlete}
            setSelectedFilter={setSelectedFilter}
            setMedals={setMedals}
          />
        </TabsContent>
        <TabsContent value="country">
          <CountrySelect
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setSelectedFilter={setSelectedFilter}
            setMedals={setMedals}
          />
        </TabsContent>
      </Tabs>
      <div>
        <Button className="w-full">Filtrer</Button>
      </div>
    </>
  );
};

export default FilterComparison;
