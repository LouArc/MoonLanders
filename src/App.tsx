import PopUpInicio from "./components/popUpInicio/popupInico";
import ArScene from "./screens/ArScene";
import "./App.css"
import { useState } from "react";

const App: React.FC = () => {
  const [speed, setSpeed] = useState<number>(1)
  const [selectedScene, setSelectedScene] = useState<string>("Sistema Solar")
  return (
    <div className="main">
      <ArScene speed={speed} selectedScene={selectedScene}/>
      <PopUpInicio speed={speed} setSpeed={setSpeed} selectedScene={selectedScene} setSelectedScene={setSelectedScene}/>
    </div>
  );
};

export default App;