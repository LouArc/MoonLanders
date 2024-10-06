import React, { useEffect, useRef, useState } from "react";
import "./ArScene.css";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import planetController from "../controllers/planet.controller";
import data from "../assets/planets.json";
import { Planet } from "../models/planet.model";
//import PopInfoPlanetas from "../components/popInfoPlanetas/popInfoPlanetas";

interface ARSceneInterface {
  setPlanetDetails: (value: boolean) => void;
  speed: number;
  selectedScene: string;
}

const ARScene: React.FC<ARSceneInterface> = ({
  setPlanetDetails,
  speed,
  selectedScene,
}) => {
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let raycaster: THREE.Raycaster;
  let sunRef: THREE.Mesh | null = null;

  const divRef = useRef<HTMLDivElement>(null);
  const [simulatorSpeed, setSimulatorSpeed] = useState<number>(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    setSimulatorSpeed(speed);
    if (divRef.current) {
      init();
      animate();
      window.addEventListener("resize", onWindowResize);
      window.addEventListener("click", onClick); // Agrega el listener de clic
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("click", onClick); // Limpia el listener de clic
      renderer.dispose();
    };
  }, [speed]);

  const init = () => {
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
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

    if (divRef.current) {
      divRef.current.appendChild(renderer.domElement);
    }

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const planets = planetController.loadPlanetData(data);

    if (selectedScene === "Sistema Solar") {
      createSolarSystem(planets);
    } else {
      displayOnlyPlanet(planets, selectedScene);
    }

    document.body.appendChild(ARButton.createButton(renderer));
  };

  const displayOnlyPlanet = (planets: Planet[], planetName: string) => {
    const foundPlanet = planets.find(
      (planet) => planet.name.toLowerCase() === planetName.toLowerCase()
    );

    if (foundPlanet) {
      planets.forEach((planet) => scene.remove(planet.mesh)); // Remueve todos los planetas
      foundPlanet.mesh.position.x = 2;
      scene.add(foundPlanet.mesh); // Agrega solo el planeta seleccionado
    } else {
      console.error(`Planet ${planetName} not found!`);
    }
  };

  const createSolarSystem = (planets: Planet[]) => {
    const sun = planetController.createPlanet(
      "sun",
      1,
      0xffdd21,
      new THREE.Vector3(0, 0, 0),
      0,
      0
    );
    scene.add(sun.mesh);
    sunRef = sun.mesh;

    planets.forEach((planet) => {
      scene.add(planet.mesh);
    });
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
    if (sunRef) {
      planetController.updateOrbit(sunRef.position, simulatorSpeed);
    }
    renderer.render(scene, camera);
  };

  const onClick = (event: MouseEvent) => {
    if (!renderer.xr.isPresenting) return; // Solo si está en modo AR

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;

      const planets = planetController.loadPlanetData(data);
      const foundPlanet = planets.find((planet) => {
        const isEqual = planet.mesh.name === selectedObject.name; // Comparison
        return isEqual; // Explicitly return the result of the comparison
      });

      if (foundPlanet) {
        displayOnlyPlanet(planets, foundPlanet.name);
        // Ajusta la posición y agrega el planeta seleccionado
        foundPlanet.mesh.position.set(2, 0, 0); // Asegúrate de que esté en la vista
        scene.add(foundPlanet.mesh); // Agrega solo el planeta seleccionado
        setSelectedPlanet(foundPlanet); // Actualiza el planeta seleccionado para mostrar el popup
        console.log("planeta es: ", foundPlanet.name);
        setPlanetDetails(false);
      }
    }
  };

  const closePopup = () => {
    setSelectedPlanet(null);
  };

  return <div ref={divRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default ARScene;
