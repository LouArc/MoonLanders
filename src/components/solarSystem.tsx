import { useEffect, useRef } from "react";
import * as THREE from "three";
import threeJsSetup from "./setup";
import planetController from "../controllers/planet.controller";
import data from "../assets/planets.json";

const SolarSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sunRef = useRef<THREE.Mesh | null>(null); // To store the Sun mesh reference

  useEffect(() => {
    const { scene, camera, renderer } = threeJsSetup(containerRef) || {};

    if (scene && camera && renderer) {
      // Create the Sun
      const sun = planetController.createPlanet(1, 0xffdd21, new THREE.Vector3(0, 0, 0), 0, 0); // Yellow color for the Sun
      scene.add(sun.mesh);
      sunRef.current = sun.mesh; // Store the Sun reference

      // Create planets with adjusted sizes and positions
      const planets = planetController.loadPlanetData(data);
      planets.forEach((planet) => scene.add(planet.mesh));

      // Add a light source
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Bright light for the Sun
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Position the camera
      camera.position.z = 150;

      // Handle window resize
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleResize);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Update the orbits of the planets
        if (sunRef.current) {
          planetController.updateOrbit(sunRef.current.position, 1);
        }

        // Render the scene
        renderer.render(scene, camera);
      };

      animate(); // Start the animation loop

      // Clean up on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SolarSystem;

