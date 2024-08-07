"use client"

import {LocationAvailableWithPictures} from "@/types/location";
import useFetchLocations from "@/app/locations/_components/locations-grid/hooks/useFetchLocations";
import CardLocation from "@/app/locations/_components/location-card";
import ReactPaginate from "react-paginate";
import {PAGE_SIZE, ROUTES} from "@/utils/constants";
import {useSearchParams} from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

interface props {
    data: LocationAvailableWithPictures[]
    totalElements: number
    currentPage: number
}

// from ReactPaginate src
type PageChangeEvent = {
    selected: number
}

const LocationsGrid = ({data, totalElements, currentPage}: props) => {
    const params = useSearchParams();
    const {handlePageChange} = useFetchLocations();
    const pageCount = Math.ceil(totalElements / PAGE_SIZE);

    const pageChange = ({selected}: PageChangeEvent) => {
        handlePageChange(selected + 1);
    }

    const buildHref = (pageNumber: number) => {
        const queryString = params.toString();
        return `${ROUTES.LOCATIONS}?${queryString.replace(/(page=)\d+/, `$1${pageNumber}`)}`;
    }

    const paginationClasses = classNames({
        "pagination my-5": true,
        "pagination--one-page": pageCount <= 1
    });

    if (!totalElements) {
        return (
            <>
                <h2 className="text-2xl">Nessuna locations trovata</h2>
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.map(location => {
                    return (
                        <Link href={{
                            pathname: `${ROUTES.LOCATIONS}/${location.id}`,
                            query: {startDate: params.get("startDate"), endDate: params.get("endDate")}
                        }} key={location.id}>
                            <CardLocation location={location}/>
                        </Link>
                    )}
                )}
            </div>
            <div className="flex justify-end">
                <ReactPaginate
                    forcePage={currentPage - 1}
                    className={paginationClasses}
                    pageCount={pageCount}
                    onPageChange={pageChange}
                    hrefBuilder={buildHref}
                    nextLabel=">"
                    previousLabel="<"
                    activeClassName="page--active"
                />
            </div>
        </>
    )
}

export default LocationsGrid;
