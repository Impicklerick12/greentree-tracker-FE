import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../images/artem-kniaz-03Dhzux8mCI-unsplash.jpg";
import image2 from "../images/george-bakos-SEFaaIjrjZA-unsplash.jpg";

const Landing = () => {
    return (
        <div className="imageCarousel">
            <AliceCarousel 
                autoPlay 
                autoPlayInterval="3000"
                disableButtonsControls="true">
                <img src={image1} width="100%" height="100%" alt="plant image 1"/>
                <img src={image2} width="100%" height="100%" alt="plant image 2"/>
            </AliceCarousel>
            <br></br>
        </div>
    )
}

export default Landing
