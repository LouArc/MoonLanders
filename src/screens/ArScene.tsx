import React, { useEffect } from "react"; 
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import SolarSystem from "../components/solarSystem";

const ARScene: React.FC = () => {
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let mesh: THREE.Mesh;

  useEffect(() => {
    init();
    animate();
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose(); // Clean up the renderer
    };
  }, []);

  const init = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      40
    );

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const geometry = new THREE.IcosahedronGeometry(0.1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(226,35,213)"),
      shininess: 6,
      flatShading: true,
      transparent: true,
      opacity: 0.8,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.5);
    scene.add(mesh);

    // Add the Solar System
    <SolarSystem scene={scene} camera={camera} renderer={renderer} />;

    // Add the AR button to the body of the DOM
    document.body.appendChild(ARButton.createButton(renderer));
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const animate = () => {
    renderer.setAnimationLoop(render);
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  return null; // This component does not render anything directly
};

export default ARScene;
