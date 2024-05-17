import { get } from "@/lib/api";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Country, CountryDetails, Medals } from "../types/stats";

type Props = {
  selectedCountry: string | null;
  setSelectedCountry: (selectedCountry: string | null) => void;
  setSelectedFilter: (selectedFilter: string | null) => void;
  setMedals: (medals: Medals) => void;
};

const CountrySelect = ({
  selectedCountry,
  setSelectedCountry,
  setSelectedFilter,
  setMedals,
}: Props) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await get<Country[]>("/getcountries/");
        setCountries(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  const handleCountryChange = async (countryId: string) => {
    const country = await get<CountryDetails>(`/getcountry/${countryId}`);
    setMedals(country.medailles);
  };

  return (
    <Select
      options={countries?.map((country) => ({
        value: country._id,
        label: country.region,
      }))}
      onChange={(selectedOption) => {
        setSelectedCountry(selectedOption?.label || null);
        setSelectedFilter(selectedOption?.label || null);
        setLoading(false);
        if (selectedOption) {
          handleCountryChange(selectedOption.value);
        }
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
