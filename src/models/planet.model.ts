import * as THREE from "three";

export type Planet = {
    name: string,
    size: number,
    color: number,
    texturePath: string,
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number
    mesh: THREE.Mesh
}