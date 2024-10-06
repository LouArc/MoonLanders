import PopUpInicio from "./components/popUpInicio/popupInico";
import VerticalTimeline from "./components/timeline/timeline";
import ArScene from "./screens/ArScene";

const App: React.FC = () => {
  const handleTimeChange = (time: number) => {
    console.log(`${time} years per second`);
  };

  return (
    <div className="App">
      <ArScene />
      <PopUpInicio />
      <VerticalTimeline maxTime={200} onTimeChange={handleTimeChange} />
    </div>
  );
};

export default App;
