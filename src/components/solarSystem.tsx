import { useEffect, useRef } from "react";
import * as THREE from "three";

const SolarSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a black background
    scene.background = new THREE.Color(0x000000);

    // Function to create planets
    const createPlanet = (
      size: number,
      color: number,
      position: THREE.Vector3
    ): THREE.Mesh => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.copy(position);
      return planet;
    };

    // Create the Sun
    const sun = createPlanet(1, 0xffdd21, new THREE.Vector3(0, 0, 0)); // Yellow color for the Sun
    scene.add(sun);

    // Create planets with adjusted sizes and positions
    const planets = [
      createPlanet(0.2, 0xff4500, new THREE.Vector3(2.5, 0, 0)), // Mercury
      createPlanet(0.4, 0xffd700, new THREE.Vector3(4, 0, 0)), // Venus
      createPlanet(0.5, 0x1e90ff, new THREE.Vector3(6, 0, 0)), // Earth
      createPlanet(0.3, 0xff8c00, new THREE.Vector3(7.5, 0, 0)), // Mars
      createPlanet(1.0, 0xffcc00, new THREE.Vector3(10, 0, 0)), // Jupiter
      createPlanet(0.9, 0x4682b4, new THREE.Vector3(12, 0, 0)), // Saturn
      createPlanet(0.6, 0x7fffd4, new THREE.Vector3(14, 0, 0)), // Uranus
      createPlanet(0.5, 0xadd8e6, new THREE.Vector3(16, 0, 0)), // Neptune
    ];

    planets.forEach((planet) => scene.add(planet));

    // Add a light source
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Bright light for the Sun
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Position the camera
    camera.position.z = 20;

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Render the scene
    const render = () => {
      renderer.render(scene, camera);
    };

    render();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SolarSystem;
  