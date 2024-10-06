import React, { useState, useEffect } from 'react';

interface PlanetInfo {
  name: string;
  mass?: number;
  size?: number;

  color?: number;

  position?: {

    x: number;

    y: number;

    z: number;

  };
  semiMajorAxis?: number;

  eccentricity?: number;

  velocity?: number;
  distanceFromEarth?: number;
  nextClosestApproach?: string;
  orbitalPeriod?: number;
  dateDiscovered?: string;
}

interface PopInfoPlanetasProps {
  selectedPlanet: string | null;
  planetData: PlanetInfo[];
  onClose: () => void;
}

const PopInfoPlanetas: React.FC<PopInfoPlanetasProps> = ({ selectedPlanet, planetData, onClose }) => {
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | null>(null);

  useEffect(() => {
    if (selectedPlanet) {
      const planet = planetData.find((p) => p.name === selectedPlanet);
      setPlanetInfo(planet || null);
    }
  }, [selectedPlanet, planetData]);

  if (!selectedPlanet || !planetInfo) {
    return null;
  }

  return (
    <div className="popInfoPlanetas">
      <div className="popInfoPlanetas-content">
        <h2>{planetInfo.name}</h2>
        <ul>
          {planetInfo.mass && <li>Mass: {planetInfo.mass}</li>}
          {planetInfo.velocity && <li>Velocity: {planetInfo.velocity}</li>}
          {planetInfo.distanceFromEarth && <li>Distance from Earth: {planetInfo.distanceFromEarth}</li>}
          {planetInfo.nextClosestApproach && <li>Next closest approach: {planetInfo.nextClosestApproach}</li>}
          {planetInfo.orbitalPeriod && <li>Orbital period: {planetInfo.orbitalPeriod}</li>}
          {planetInfo.dateDiscovered && <li>Date discovered: {planetInfo.dateDiscovered}</li>}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopInfoPlanetas;
