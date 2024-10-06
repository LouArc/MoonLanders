import * as THREE from "three";

export type Planet = {
    name: string,
    size: number,
    color: number,
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number,
    texturePath: string,
    rotationSpeed: number,
    orbitingObjects: Planet[]
    mesh: THREE.Mesh
}