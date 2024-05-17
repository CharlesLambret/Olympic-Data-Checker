import useDebounce from "@/app/hooks/useDebounce";
import { Athlete, AthleteDetails } from "@/athletes/types/athlete";
import { get } from "@/lib/api";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Medals } from "../types/stats";

type Props = {
  selectedAthlete: string | null;
  setSelectedAthlete: (selectedAthlete: string | null) => void;
  setSelectedFilter: (selectedFilter: string | null) => void;
  setMedals: (medals: Medals) => void;
};

const AthleteSelect = ({
  selectedAthlete,
  setSelectedAthlete,
  setSelectedFilter,
  setMedals,
}: Props) => {
  const [athletes, setAthletes] = useState<Athlete[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const query =
          "?name=" + (debouncedSearch || "") + "&page=1&pageSize=20";

        const response = await get<Athlete[]>("/getathletes" + query);
        setAthletes(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [debouncedSearch]);

  const handleAthleteChange = async (athleteId: string) => {
    const athlete = await get<AthleteDetails>(`/getathlete/${athleteId}`);
    setMedals(
      athlete.medailles.reduce(
        (acc, medaille) => {
          acc[medaille.NomMedaille.toLowerCase() as keyof Medals]++;
          return acc;
        },
        { gold: 0, silver: 0, bronze: 0 }
      )
    );
  };

  return (
    <Select
      options={athletes?.map((athlete) => ({
        value: athlete._id,
        label: athlete.Nom,
      }))}
      onChange={(selectedOption) => {
        setSelectedAthlete(selectedOption?.label || null);
        setSelectedFilter(selectedOption?.label || null);
        setLoading(false);
        handleAthleteChange(selectedOption?.value || "");
      }}
      onInputChange={(inputValue) => {
        setSearch(inputValue);
      }}
      isLoading={loading}
      isClearable={true}
      value={
        selectedAthlete
          ? {
              value: selectedAthlete,
              label: selectedAthlete,
            }
          : null
      }
      placeholder="Sélectionnez un athlète"
    />
  );
};

export default AthleteSelect;
