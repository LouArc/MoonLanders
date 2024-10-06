import "./getinfo.css";
import planetData from "../../assets/planetInfo.json"

interface GetInfoProps {
    setIsInfoSelected: React.Dispatch<React.SetStateAction<boolean>>,
    selectedScene: string
}

export const GetInfo: React.FC<GetInfoProps> = ({setIsInfoSelected, selectedScene}) => {
    const planetInfo = planetData.find(planet => planet.name.toLowerCase() === selectedScene.toLowerCase());

  return (
    <div className="getInfo">
      <div className="info">
        <h2>{selectedScene}</h2>
        <p>{planetInfo ? planetInfo.description : "No description available."}</p>
        <button onClick={() => {setIsInfoSelected(false)}} style={{width:200}} >GO BACK</button>
      </div>
    </div>
  );
};
