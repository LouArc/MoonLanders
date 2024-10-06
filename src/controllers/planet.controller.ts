import * as THREE from "three";
import { Planet } from "../models/planet.model";

interface PlanetData {
  name: string,
  size: number;
  color: number;
  position: { x: number; y: number; z: number };
  semiMajorAxis: number;
  eccentricity: number;
  rotationSpeed: number;
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
    rotationSpeed: number
  ): Planet {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
    });

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
      rotationSpeed
    };
    return planet;
  }

  loadPlanetData(json: PlanetData[]): Planet[] {
    try {
      this.planets = json.map(
        ({ name, size, color, position, semiMajorAxis, eccentricity, rotationSpeed }) =>
          this.createPlanet(
            name,
            size,
            color,
            new THREE.Vector3(position.x, position.y, position.z),
            semiMajorAxis,
            eccentricity,
            rotationSpeed
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
    });

    this.time += 0.01 * timeScale; // Increment time to simulate motion, scaled by timeScale
  }
}

export default new PlanetController();
