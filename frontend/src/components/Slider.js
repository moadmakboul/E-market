import React, { useEffect, useRef, useState } from 'react';
import slide1 from '../assets/sliders/apple_slider_1.jpg'
import slide2 from '../assets/sliders/apple_slider_2.jpg'
import slide3 from '../assets/sliders/apple_slider_3.jpg'
import '../styles/slider.css'

const slides = [slide1, slide2, slide3]

const delay = 5000

const Slider = () => {
    const [index, setIndex] = useState(0)
    const timeoutRef = useRef(null)

    const resetTimeout = () => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [index]);

    return (
        <div className='slideshow'>
            <div className='slideshowSlider' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {slides.map((slide, index) => {
                    return <img src={slide} className='slide' alt="" key={index} />
                })}
            </div>
            <div className='slideshowDots'>
                {slides.map((_, idx)=>(
                    <div
                    key={idx}
                    className={`slideshowDot${index === idx ? " active" : ""}`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                ))}
            </div>            
        </div>
    );
}

export default Slider;
