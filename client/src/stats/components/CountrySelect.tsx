import { get } from "@/lib/api";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Country } from "../types/stats";

type Props = {
  selectedCountry: string | null;
  setSelectedCountry: (selectedCountry: string | null) => void;
  setSelectedFilter: (selectedFilter: string | null) => void;
};

const CountrySelect = ({
  selectedCountry,
  setSelectedCountry,
  setSelectedFilter,
}: Props) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await get<Country[]>("/getcountries/france");
        setCountries(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  return (
    <Select
      options={countries?.map((country) => ({
        value: country.region,
        label: country.region,
      }))}
      onChange={(selectedOption) => {
        setSelectedCountry(selectedOption?.value || null);
        setSelectedFilter(selectedOption?.value || null);
        setLoading(false);
      }}
      isLoading={loading}
      value={
        selectedCountry
          ? {
              value: selectedCountry,
              label: selectedCountry,
            }
          : null
      }
      isClearable={true}
      placeholder="Sélectionnez un pays"
    />
  );
};

export default CountrySelect;
