import useDebounce from "@/app/hooks/useDebounce";
import { Athlete } from "@/athletes/types/athlete";
import { get } from "@/lib/api";
import { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  selectedAthlete: string | null;
  setSelectedAthlete: (selectedAthlete: string | null) => void;
  setSelectedFilter: (selectedFilter: string | null) => void;
};

const AthleteSelect = ({
  selectedAthlete,
  setSelectedAthlete,
  setSelectedFilter,
}: Props) => {
  const [athletes, setAthletes] = useState<Athlete[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const searchQuery = search ? search : "";
        const response = await get<Athlete[]>(
          "/getathletes?name=" + searchQuery
        );
        response.length = 100;
        setAthletes(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [debouncedSearch]);

  return (
    <Select
      options={athletes?.map((athlete) => ({
        value: athlete.Nom,
        label: athlete.Nom,
      }))}
      onChange={(selectedOption) => {
        setSelectedAthlete(selectedOption?.value || null);
        setSelectedFilter(selectedOption?.value || null);
        setLoading(false);
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
