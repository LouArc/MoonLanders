// src/App.tsx
import React, { useState } from "react";
import ArScene from "./screens/ArScene";
import PopUpInicio from "./components/popUpInicio/popupInico";
import VerticalTimeline from "./components/timeline/timeline";

const App: React.FC = () => {
  const [isSomeComponentVisible, setSomeComponentVisible] = useState(false);

  const handleClose = () => {
    setSomeComponentVisible(true);
  };

  return (
    <div className="App">
      <PopUpInicio onClose={handleClose} />
      {isSomeComponentVisible && <VerticalTimeline />}
      <ArScene />
       
    </div>
  );
};

export default App;
