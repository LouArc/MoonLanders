import * as THREE from "three";
import { Planet } from "../models/planet.model";

interface TextureInterface{
  name: string;
  texture: string;
}

import mercuryTexture from "../assets/textures/mercury.jpg"
import venusTexture from "../assets/textures/venus.jpg"
import earthTexture from "../assets/textures/earth.jpg"
import marsTexture from "../assets/textures/mars.jpg"
import jupiterTexture from "../assets/textures/jupiter.jpg"
import saturnTexture from "../assets/textures/saturn.jpg"
import uranusTexture from "../assets/textures/uranus.jpg"
import neptuneTexture from "../assets/textures/neptune.jpg"
import lunaTexture from "../assets/textures/luna.jpeg"

const textureArray: TextureInterface[] = [
  { name: "Mercurio", texture: mercuryTexture },
  { name: "Venus", texture: venusTexture },
  { name: "Tierra", texture: earthTexture },
  { name: "Marte", texture: marsTexture },
  { name: "Jupiter", texture: jupiterTexture },
  { name: "Saturno", texture: saturnTexture },
  { name: "Urano", texture: uranusTexture },
  { name: "Neptuno", texture: neptuneTexture },
  {name: "Luna", texture: lunaTexture}
];

interface PlanetData {
  name: string;
  size: number;
  color: number;
  position: { x: number; y: number; z: number };
  semiMajorAxis: number;
  eccentricity: number;
  texturePath: string;
  rotationSpeed: number;
  orbitingObjects: PlanetData[];
}

class PlanetController {
  private planets: Planet[] = [];
  private time: number = 0; // Time variable for orbit calculations

  createPlanet(
    name: string,
    size: number,
    color: number,
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number,
    texturePath: string,
    rotationSpeed: number,
    orbitingObjects: Planet[]
  ): Planet {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    console.log(name)
    console.log(textureArray)
    const textureLoader = new THREE.TextureLoader();
    const textureObject = textureArray.find((texture) => texture.name == name);
    
    let texture: THREE.Texture
    if(textureObject != undefined){
      
      texture = textureLoader.load(textureObject.texture); // Replace with your texture path
    }else{
      
      texture = textureLoader.load("");
    }
    
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);

    

    const planet: Planet = {
      name,
      size,
      color,
      position,
      mesh,
      semiMajorAxis,
      eccentricity,
      texturePath,
      rotationSpeed,
      orbitingObjects,
    };
    return planet;
  }

  loadPlanetData(json: PlanetData[]): Planet[] {
    try {
      this.planets = json.map(
        ({
          name,
          size,
          color,
          position,
          semiMajorAxis,
          eccentricity,
          texturePath,
          rotationSpeed,
          orbitingObjects
        }) =>
          this.createPlanet(
            name,
            size,
            color,
            new THREE.Vector3(position.x, position.y, position.z),
            semiMajorAxis,
            eccentricity,
            texturePath,
            rotationSpeed,
            orbitingObjects.map(orbitingObject => 
              this.createPlanet(
                orbitingObject.name,
                orbitingObject.size,
                orbitingObject.color,
                new THREE.Vector3(orbitingObject.position.x, orbitingObject.position.y, orbitingObject.position.z),
                orbitingObject.semiMajorAxis,
                orbitingObject.eccentricity,
                orbitingObject.texturePath,
                orbitingObject.rotationSpeed,
                [] // Assuming orbitingObjects of orbitingObject is empty at this level
              )
            )
          )
      );

      return this.planets;
    } catch (error) {
      console.error("Error loading planet data:", error);
      return [];
    }
  }

  updateOrbit(sunPosition: THREE.Vector3, simulationSpeed: number) {
    const G = 6.6743e-11; // Gravitational constant
    const massSun = 1.989e30; // Mass of the Sun in kg (arbitrary unit for simulation)

    const timeScale = simulationSpeed * 0.0001; // Adjust this value to control the speed of the simulation

    this.planets.forEach((planet) => {
      // Kepler's laws of planetary motion parameters
      const a = planet.semiMajorAxis; // Semi-major axis
      const e = planet.eccentricity; // Eccentricity

      // Calculate the orbital period using Kepler's Third Law: T^2 = (4 * pi^2 / (G * massSun)) * a^3
      const orbitalPeriod = Math.sqrt(
        (4 * Math.PI ** 2 * a ** 3) / (G * massSun)
      ); // in seconds

      // Calculate the angular velocity based on the orbital period
      const angularVelocity = (2 * Math.PI) / orbitalPeriod; // radians per second

      // Calculate the angle theta based on velocity and time
      const theta = angularVelocity * (this.time * timeScale); // Angle in radians

      // Calculate the distance from the sun
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta)); // Distance from the sun

      // Update the position using polar coordinates
      planet.position.x = sunPosition.x + r * Math.cos(theta);
      planet.position.z = sunPosition.z + r * Math.sin(theta);
      planet.mesh.position.set(
        planet.position.x,
        planet.position.y,
        planet.position.z
      );

      // Rotate the planet on its own axis
      planet.mesh.rotation.y += planet.rotationSpeed * timeScale; // Rotate along the Y-axis (change axis if needed)

      // Now update the orbiting objects (moons, etc.)
      planet.orbitingObjects.forEach((orbitingObject) => {
        console.log(orbitingObject)
        this.updateOrbitingObject(planet, orbitingObject, timeScale);
      });
    });

    this.time += 0.01 * timeScale; // Increment time to simulate motion, scaled by timeScale
  }

  // This method handles updating the position of orbiting objects (like moons)
  updateOrbitingObject(
    planet: Planet,
    orbitingObject: Planet,
    timeScale: number
  ) {
    const a = orbitingObject.semiMajorAxis; // Semi-major axis
    const e = orbitingObject.eccentricity; // Eccentricity

    // Kepler's Third Law for orbiting object (same formula)
    const orbitalPeriod = Math.sqrt(
      (4 * Math.PI ** 2 * a ** 3) / (6.6743e-11 * 5.972e24) // Gravitational constant and mass of planet (arbitrary unit for simulation)
    );

    const angularVelocity = (2 * Math.PI) / orbitalPeriod;
    const theta = angularVelocity * (this.time * timeScale);
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));

    // Position relative to parent planet
    orbitingObject.position.x = planet.position.x + r * Math.cos(theta);
    orbitingObject.position.z = planet.position.z + r * Math.sin(theta);
    orbitingObject.mesh.position.set(
      orbitingObject.position.x,
      orbitingObject.position.y,
      orbitingObject.position.z
    );

    // Rotate the orbiting object on its axis
    orbitingObject.mesh.rotation.y += orbitingObject.rotationSpeed * timeScale;
  }
}

export default new PlanetController();