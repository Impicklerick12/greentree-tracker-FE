import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../images/aiokr-chen-YtqUWAlL2GE-unsplash.jpg";
import image2 from "../images/artem-kniaz-03Dhzux8mCI-unsplash.jpg";
import image3 from "../images/george-bakos-SEFaaIjrjZA-unsplash.jpg";

const Landing = () => {
    return (
        <div className="imageCarousel">
        <AliceCarousel autoPlay autoPlayInterval="3000">
            <img src={image1} className="sliderimg" width="70%" height="70%" alt="plant image 1"/>
            <img src={image2} className="sliderimg" width="70%" height="70%" alt="plant image 2"/>
            <img src={image3} className="sliderimg" width="70%" height="70%" alt="plant image 3"/>
        </AliceCarousel>
        </div>
    )
}

export default Landing
