import {useEffect, useState} from "react";

const useScrollTop = () => {
    const [isOnTop, setIsOnTop] = useState(typeof window !== "undefined" && window.scrollY === 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsOnTop(typeof window !== "undefined" && window.scrollY === 0);
        }

        typeof document !== "undefined" && document.addEventListener("scroll", handleScroll);

        return(() => {
            typeof document !== "undefined" && document.removeEventListener("scroll", handleScroll);
        });
    }, []);

    return {
        isOnTop
    }
}

export default useScrollTop;
