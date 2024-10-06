import React from "react";
import "./popupInicio.css";

interface PopUpInicioInterface {
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  selectedScene: string;
  setSelectedScene: React.Dispatch<React.SetStateAction<string>>;
  setIsInfoSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopUpInicio: React.FC<PopUpInicioInterface> = ({
  speed,
  setSpeed,
  selectedScene,
  setSelectedScene,
  setIsInfoSelected,
}) => {
  const nombresPlanetas = [
    "Sistema Solar",
    "Mercurio",
    "Venus",
    "Tierra",
    "Marte",
    "Jupiter",
    "Saturno",
    "Urano",
    "Neptuno",
  ];

  const handleSceneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScene(event.target.value); // Update the selected scene state
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value)); // Update the slider value state
  };

  return (
    <div className="popupInicio">
      <div className="info">
        <h2>Digital Solar System</h2>
        <p>Move in real life to move through the galaxy</p>

        {/* Scene Selector Dropdown */}
        <form>
          <div className="slidecontainer">
            <label htmlFor="sceneSelector">Choose a Scene: </label>
            <select
              id="sceneSelector"
              value={selectedScene}
              onChange={handleSceneChange} // Handle dropdown changes
              className="dropdown"
            >
              {nombresPlanetas.map((nombre, index) => (
                <option key={index} value={nombre.toLowerCase()}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="slidecontainer">
            <input
              type="range"
              min="0" // Minimum value
              max="1" // Maximum value
              step="0.1" // Step size (intervals of 0.1)
              value={speed} // Current value
              className="slider"
              id="myRange"
              onChange={handleSliderChange} // Handle slider changes
            />
            <p>
              Simulation Speed: <span id="demo">{speed}</span> day/s
            </p>{" "}
            {/* Display the current slider value */}
          </div>
        </form>

        <button
          style={{ width: 200 }}
          onClick={() => {
            setIsInfoSelected(true);
          }}
        >
          GET INFO!!
        </button>
      </div>
    </div>
  );
};

export default PopUpInicio;
