import Skeleton from "react-loading-skeleton";
import Card from "@/components/card";

const ListLoader = () => {
    return (
        <>
            {Array(5).fill(1).map((_, index) => (
                <>
                    <Card className="mb-5">
                        <Skeleton key={index} count={5} height={30} style={{marginTop: "15px"}}/>
                    </Card>
                </>
            ))}
        </>
    )
}

export default ListLoader;
