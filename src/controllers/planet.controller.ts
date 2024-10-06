import * as THREE from "three";
import { Planet } from "../models/planet.model";

interface PlanetData {
  name: string,
  size: number;
  color: number; // You may remove this if color is replaced by textures
  texturePath: string; // Path to the texture file for the planet
  position: { x: number; y: number; z: number };
  semiMajorAxis: number;
  eccentricity: number;
}

class PlanetController {
  private planets: Planet[] = [];
  private time: number = 0; // Time variable for orbit calculations

  // Modify createPlanet to take texturePath as a parameter
  createPlanet(
    name: string,
    size: number,
    texturePath: string, // Accept texture path
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number
  ): Planet {
    const geometry = new THREE.SphereGeometry(size, 32, 32);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath); // Load the texture from the given path

    const material = new THREE.MeshStandardMaterial({
      map: texture, // Use the texture instead of a color
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);

    const planet: Planet = {
      name,
      size,
      color: 0, // Optional, not used if textures are applied
      position,
      mesh,
      semiMajorAxis,
      eccentricity,
    };
    return planet;
  }

  loadPlanetData(json: PlanetData[]): Planet[] {
    try {
      this.planets = json.map(
        ({ name, size, texturePath, position, semiMajorAxis, eccentricity }) =>
          this.createPlanet(
            name,
            size,
            texturePath, // Use the texture path from the JSON
            new THREE.Vector3(position.x, position.y, position.z),
            semiMajorAxis,
            eccentricity
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

    // You can set this value based on your needs; for example, 1 for normal speed, 2 for double speed, etc.
    const timeScale = simulationSpeed * 0.0001; // Adjust this value to control the speed of the simulation (0 < timeScale)

    this.planets.forEach((planet) => {
      // Kepler's laws of planetary motion parameters
      const a = planet.semiMajorAxis; // Semi-major axis (arbitrary units)
      const e = planet.eccentricity; // Eccentricity
      //const b = a * Math.sqrt(1 - e * e); // Semi-minor axis

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
    });

    this.time += 0.01 * timeScale; // Increment time to simulate motion, scaled by timeScale
  }
}

export default new PlanetController();
