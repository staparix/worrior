import * as BABYLON from "babylonjs";
const getMaterial = (scene: BABYLON.Scene): BABYLON.PBRMaterial  => {
    // const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/environment.dds", scene);
    const hdrTexture = new BABYLON.HDRCubeTexture("assets/studio024.hdr", scene, 512);
    const metal = new BABYLON.PBRMaterial("metal", scene);
    // metal.reflectionTexture = hdrTexture;
    // metal.microSurface = 0.76;
    // metal.reflectivityColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    // metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);

    metal.reflectionTexture = hdrTexture;
    metal.directIntensity = 0.3;
    metal.environmentIntensity = 0.5;
    metal.cameraExposure = 0.6;
    metal.cameraContrast = 1.6;
    metal.microSurface = 0.86;
    metal.reflectivityColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    metal.albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    return metal;
};

export const applyMateril = (mesh: BABYLON.AbstractMesh, scene: BABYLON.Scene) => {
    mesh.material = getMaterial(scene);
};
