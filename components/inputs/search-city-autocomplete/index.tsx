"use client"

import Select from "react-select";
import {Location} from "@prisma/client";
import useSearchCity from "@/components/inputs/search-city-autocomplete/hooks/useSearchCity";
import {useMemo, useState} from "react";
import {debounce} from "next/dist/server/utils";
import classNames from "classnames";

export type AutocompleteCityOption = Pick<Location, "lat" | "lng"> & {
    label: string
    value: string
}

interface props {
    initialValue?: AutocompleteCityOption
    onCitySelect: (payload: AutocompleteCityOption) => void
}

const SearchCityAutocomplete = ({onCitySelect, initialValue}: props) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!initialValue);

    const {
        cities,
        loading,
        searchCity
    } = useSearchCity();

    const options: AutocompleteCityOption[] = useMemo(() => {
        return cities.map((city) => ({
            value: city.display_name,
            label: city.display_name,
            lat: +city.lat,
            lng: +city.lon
        }))
    }, [cities]);

    const handleCitySearch = debounce(async (city: string) => {
        if (city) {
            await searchCity(city);
        }
    }, 800);

    const handleCitySelect = (selection: AutocompleteCityOption | null) => {
        if (selection) {
            setHasValue(true);
            onCitySelect(selection)
        } else {
            setHasValue(false);
        }
    }

    const labelClasses = classNames({
        "z-10": true,
        "!relative !top-3 text-sm": focused || hasValue,
        "absolute": !focused && !hasValue,
    });

    return (
        <>
            <label htmlFor="city-autocomplete" className={labelClasses}>Cittá</label>
            <Select
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                defaultValue={initialValue}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderColor: "rgb(251 146 60)",
                        borderRadius: "0",
                        boxShadow: "none",
                        "&:hover": {
                            borderColor: "rgb(251 146 60)",
                            boxShadow: "none"
                        }
                    }),
                    valueContainer: (baseStyles, state) => ({
                        paddingRight: "0",
                        paddingLeft: "0",
                        height: "15px"
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        marginTop: "0"
                    }),
                    indicatorsContainer: (baseStyles, state) => ({
                        "display": "none"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        ...(state.isSelected ? {backgroundColor: "rgb(251 146 60) !important"} : {backgroundColor: "white"}),
                        "&:hover": {
                            backgroundColor: "rgba(251, 146, 60, 0.3)"
                        },
                        "&:active": {
                            backgroundColor: "rgb(251, 146, 60)"
                        }
                    })
                }}
                className="autocomplete"
                placeholder=""
                id="city-autocomplete"
                options={options}
                loadingMessage={_ => `Caricamento...`}
                isLoading={loading}
                onInputChange={handleCitySearch}
                onChange={handleCitySelect}
            />
        </>
    );
};

export default SearchCityAutocomplete;
