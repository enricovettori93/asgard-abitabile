import React from 'react';
import Skeleton from "react-loading-skeleton";

const LocationLoader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Skeleton className="col-span-1 md:col-span-2 rounded-2xl" count={1} height={400} width="100%"/>
            <div>
                <Skeleton className="col-span-1" count={1} height={100} style={{marginTop: "15px"}}/>
                <Skeleton className="col-span-1" count={5} height={30} style={{marginTop: "15px"}}/>
            </div>
        </div>
    );
};

export default LocationLoader;
