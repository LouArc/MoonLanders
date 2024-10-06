import React, { useState } from "react";
import "./popupInicio.css";

export const PopUpInicio: React.FC = () => {
    const [sliderValue, setSliderValue] = useState<number>(0); // Initialize the slider value at 0

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(event.target.value)); // Update the slider value state
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
                            min="-100"    // Minimum value
                            max="100"     // Maximum value
                            value={sliderValue} // Current value
                            className="slider"
                            id="myRange"
                            onChange={handleSliderChange} // Handle slider changes
                        />
                        <p>Time: <span id="demo">{sliderValue}</span> day/s</p> {/* Display the current slider value */}
                    </div>
                </form>
                <button>GO</button>
            </div>
        </div>
    );
};

export default PopUpInicio;
