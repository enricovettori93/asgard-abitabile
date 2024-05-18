"use client"

import {useState} from "react";
import LocationSearchForm from "@/components/location-search-form";

const LocationListFilters = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(prev => !prev)}>Filtri</button>
            {
                isOpen && (
                    <LocationSearchForm />
                )
            }
        </div>
    );
};

export default LocationListFilters;
