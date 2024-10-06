import PopUpInicio from "./components/popUpInicio/popupInico";
import { GetInfo } from "./components/GetInfo";
import ArScene from "./screens/ArScene";
import "./App.css";
import { useState } from "react";

const App: React.FC = () => {
  const [speed, setSpeed] = useState<number>(0.05);
  const [selectedScene, setSelectedScene] = useState<string>("Sistema Solar");
  const [isInfoSelected, setIsInfoSelected] = useState<boolean>(false);

  return (
    <div className="main">
      <ArScene speed={speed} selectedScene={selectedScene} />

      {isInfoSelected ? (
        <GetInfo
          setIsInfoSelected={setIsInfoSelected}
          selectedScene={selectedScene}
        />
      ) : (
        <PopUpInicio
          speed={speed}
          setSpeed={setSpeed}
          selectedScene={selectedScene}
          setSelectedScene={setSelectedScene}
          setIsInfoSelected={setIsInfoSelected}
        />
      )}
    </div>
  );
};

export default App;
