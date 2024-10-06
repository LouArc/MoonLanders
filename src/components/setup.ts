import * as THREE from "three";

export default function threeJsSetup(
  containerRef: React.MutableRefObject<HTMLDivElement | null>
):
  | {
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      renderer: THREE.WebGLRenderer;
    }
  | undefined {
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

  return { scene, camera, renderer };
}
