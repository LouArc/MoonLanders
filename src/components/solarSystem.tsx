import { useEffect, useRef } from "react";
import * as THREE from "three";
import planetController from "../controllers/planet.controller";
import data from "../assets/planets.json";

interface SolarSystemProps {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ scene }) => {
  const sunRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // Create the Sun
    const sun = planetController.createPlanet(
      1,
      0xffdd21,
      new THREE.Vector3(0, 0, 0),
      0,
      0
    ); // Yellow color for the Sun
    scene.add(sun.mesh);
    sunRef.current = sun.mesh; // Store the Sun reference

    // Create planets with adjusted sizes and positions
    const planets = planetController.loadPlanetData(data);
    planets.forEach((planet) => scene.add(planet.mesh));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Bright light for the Sun
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Update function to animate planets
    const animatePlanets = () => {
      if (sunRef.current) {
        planetController.updateOrbit(sunRef.current.position, 1);
      }
    };

    return () => {
      // Cleanup if necessary
    };
  }, [scene]);

  return null; // This component does not render anything directly
};

export default SolarSystem;
