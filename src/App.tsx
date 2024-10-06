import PopUpInicio from "./components/popUpInicio/popupInico";
import ArScene from "./screens/ArScene";
import "./App.css"
import { useState } from "react";

const App: React.FC = () => {
  const [speed, setSpeed] = useState<number>(1)
  return (
    <div className="main">
      <ArScene speed={speed}/>
      <PopUpInicio speed={speed} setSpeed={setSpeed}/>
    </div>
  );
};

export default App;
