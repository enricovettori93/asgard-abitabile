import Skeleton from "react-loading-skeleton";

const LocationGridLoader = () => {
    return (
        <div>
            <Skeleton count={1} height={100}/>
            <Skeleton count={5} height={30} style={{marginTop: "15px"}}/>
        </div>
    )
}

export default LocationGridLoader;
