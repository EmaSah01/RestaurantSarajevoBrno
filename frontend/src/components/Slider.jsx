import React, { useEffect, useState } from "react";
import "./Slider.css";

function Slider({ id, images, direction }) {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const duplicated = [...images, ...images];
        setSlides(duplicated);

        // Dynamically set --slide-count to match number of slides
        document.documentElement.style.setProperty('--slide-count', duplicated.length.toString());
    }, [images]);

    return (
        <div className="slider" id={id}>
            <div className={`slider-track ${direction === "right" ? "scrollRight" : "scrollLeft"}`}>
                {slides.map((src, index) => (
                    <div className="slide" key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
