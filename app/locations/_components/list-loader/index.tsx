import Skeleton from "react-loading-skeleton";

const ListLoader = () => {
    return (
        <div>
            <Skeleton count={1} height={100}/>
            <Skeleton count={5} height={30} style={{marginTop: "15px"}}/>
        </div>
    )
}

export default ListLoader;
