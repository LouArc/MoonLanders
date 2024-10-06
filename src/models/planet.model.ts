import * as THREE from "three";

export type Planet = {
    name: string,
    size: number,
    color: number,
    position: THREE.Vector3,
    semiMajorAxis: number,
    eccentricity: number
    mesh: THREE.Mesh

    mass: number,
    velocity: number,
    distanceEarth: number,
    nextClosesApproach: string,
    orbitalPeriod: string,
    dateDiscovered: string,
}