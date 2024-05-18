import {useEffect, useRef, useState} from "react";

const useScrollListener = () => {
    const lastScrollTop = useRef(0);
    const [direction, setDirection] = useState<"up" | "down" | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setDirection(lastScrollTop.current - currentPosition < 0 ? "down" : "up");
            lastScrollTop.current = currentPosition;
        }

        typeof document !== "undefined" && document.addEventListener("scrollend", handleScroll);

        return(() => {
            typeof document !== "undefined" && document.removeEventListener("scrollend", handleScroll);
        });
    }, []);

    return {
        direction
    }
}

export default useScrollListener;
