import {useEffect, useState} from "react";

const useSlidesPerView = () => {
    const calculateSlides = () => {
        const width = window.innerWidth;
        if (width < 576) {
            return 1;
        } else if (width < 992) {
            return 2;
        }
        return 3;
    }

    const [slides, setSlides] = useState(calculateSlides());

    useEffect(() => {
        const listener = () => {
            setSlides(calculateSlides());
        }

        window.addEventListener("resize", listener);

        return (() => {
            window.removeEventListener("resize", listener);
        })
    }, []);

    return {
        slides
    }
}

export default useSlidesPerView;
