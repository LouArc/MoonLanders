import * as THREE from "three";

export type Planet = {

    size: number,
    color: number,
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number
    mesh: THREE.Mesh
}