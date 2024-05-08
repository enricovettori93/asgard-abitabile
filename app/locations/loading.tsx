import ListLoader from "@/components/list-loader";

export default function Loading() {
    return (
        <div className="w-full p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
                {
                    Array(6).fill(1).map((_, idx) => (
                        <ListLoader key={idx}/>
                    ))
                }
            </div>
        </div>
    )
}
