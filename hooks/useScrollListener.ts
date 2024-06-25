import {useEffect, useRef, useState} from "react";

const useScrollListener = () => {
    const lastScrollPosition = useRef(0);
    const [direction, setDirection] = useState<"up" | "down" | null>(null);
    const [isOnTop, setIsOnTop] = useState(typeof window !== "undefined" ? window.scrollY === 0 : true);
    const [scrollFromTop, setScrollFromTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                const currentPosition = window.scrollY;
                setDirection(lastScrollPosition.current - currentPosition < 0 ? "down" : "up");
                setIsOnTop(currentPosition === 0);
                setScrollFromTop(currentPosition);
                lastScrollPosition.current = currentPosition;
            }
        }

        typeof document !== "undefined" && document.addEventListener("scroll", handleScroll);

        return(() => {
            typeof document !== "undefined" && document.removeEventListener("scroll", handleScroll);
        });
    }, []);

    return {
        direction,
        scrollFromTop,
        isOnTop
    }
}

export default useScrollListener;
