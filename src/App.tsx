import SolarSystem from "./components/solarSystem";
import PopUpInicio from "./components/popUpInicio/popupInico";
import VerticalTimeline from "./components/timeline/timeline";

const App = () => {
  const handleTimeChange = (time: number) => {
    console.log(`${time} years per second`);
  };
  return (
    <div className="paginaInicio">
      <SolarSystem />
      <PopUpInicio />
      <VerticalTimeline maxTime={200} onTimeChange={handleTimeChange} />
    </div>
  );
};

export default App;
