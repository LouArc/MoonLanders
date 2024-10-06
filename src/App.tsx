import PopUpInicio from "./components/popUpInicio/popupInico";
import ArScene from "./screens/ArScene";
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="main">
      <ArScene />
      <PopUpInicio />
    </div>
  );
};

export default App;
