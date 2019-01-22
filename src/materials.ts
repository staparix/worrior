import * as BABYLON from "babylonjs";

export const createMetal = (scene: BABYLON.Scene): BABYLON.PBRMaterial => {
    const hdrTexture = new BABYLON.HDRCubeTexture("assets/studio024.hdr", scene, 512);
    const metal = new BABYLON.PBRMaterial("metal", scene);
    metal.microSurface = 0.46;
    metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);

    metal.reflectionTexture = hdrTexture;
    metal.specularIntensity = 1;
    return metal;
};

// function sword(scene: BABYLON.Scene) {
//     const sword = new BABYLON.PBRMaterial("sword", scene);
//     sword.albedoTexture = new
// }
