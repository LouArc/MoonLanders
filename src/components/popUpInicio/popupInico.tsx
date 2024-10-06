import React, { useState } from "react";
import "./popupInicio.css";

interface PopUpInicioInterface {
    setSpeed: React.Dispatch<React.SetStateAction<number>>
    speed: number
}

export const PopUpInicio: React.FC<PopUpInicioInterface> = ({speed, setSpeed}) => {
    

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value)); // Update the slider value state
    };

    return (
        <div className="popupInicio">
            <div className="info">
                <h2>Digital Solar System</h2>
                <p>Move in real life to move through the galaxy</p>
                <form>
                    <div className="slidecontainer">
                        <input
                            type="range"
                            min="0"    // Minimum value
                            max="5"     // Maximum value
                            value={speed} // Current value
                            className="slider"
                            id="myRange"
                            onChange={handleSliderChange} // Handle slider changes
                        />
                        <p>Simulation Speed: <span id="demo">{speed}</span> day/s</p> {/* Display the current slider value */}
                    </div>
                </form>
                <button>GO</button>
            </div>
        </div>
    );
};

export default PopUpInicio;
