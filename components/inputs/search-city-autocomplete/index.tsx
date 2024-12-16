"use client"

import Select from "react-select";
import {Location} from "@prisma/client";
import useSearchCity from "@/components/inputs/search-city-autocomplete/hooks/useSearchCity";
import {useCallback, useMemo, useState} from "react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
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
        if (isEmpty(cities)) return [];
        return cities.map((city) => ({
            value: city.display_name,
            label: city.display_name,
            lat: +city.lat,
            lng: +city.lon
        }))
    }, [cities]);

    const handleCitySearch = useCallback(debounce(async (city: string) => {
        if (city) {
            await searchCity(city);
        }
    }, 800), [searchCity]);

    const handleCitySelect = (selection: AutocompleteCityOption | null) => {
        if (selection) {
            setHasValue(true);
            onCitySelect(selection)
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
                styles={{
                    control: (baseStyles) => ({
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
                    valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        paddingRight: "0",
                        paddingLeft: "0",
                        alignItems: "flex-end"
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        marginLeft: "0"
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        marginTop: "0"
                    }),
                    indicatorsContainer: (baseStyles) => ({
                        ...baseStyles,
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
                noOptionsMessage={_ => `Nessuna città trovata`}
                isLoading={loading}
                onInputChange={handleCitySearch}
                onChange={handleCitySelect}
                {...initialValue?.value && {defaultValue: initialValue}}
            />
        </>
    );
};

export default SearchCityAutocomplete;
