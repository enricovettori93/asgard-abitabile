"use client"

import {LocationWithPictures} from "@/types/location";
import useFetchLocations from "@/app/locations/_components/locations-grid/hooks/useFetchLocations";
import CardLocation from "@/app/locations/_components/location-card";

interface props {
    data: LocationWithPictures[]
    totalElements: number
    currentPage: number
}

const LocationsGrid = ({data, totalElements, currentPage}: props) => {
    const {locations, loading, handleLoadMore} = useFetchLocations({data, currentPage})

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {locations.map(location => <CardLocation key={location.id} location={location}/>)}
            </div>
            {
                locations.length !== totalElements && (
                    <div className="flex justify-center my-10">
                        <button disabled={loading} className="button--primary" onClick={handleLoadMore}>Load more</button>
                    </div>
                )
            }
        </section>
    )
}

export default LocationsGrid;
