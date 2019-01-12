import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MainManeken } from "../mockServer/assetLoader";

let scene: BABYLON.Scene;
export const bootstrap = (canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise((resolve) => {
        const engine = new BABYLON.Engine(canvas, true);
        scene = createScene(engine, canvas);
        const renderLoop = () => {
            scene.render();
        };
        engine.runRenderLoop(renderLoop);
        resolve();
    });
};

export let assetsManager: BABYLON.AssetsManager;
function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    const scene = new BABYLON.Scene(engine);
    // scene.createDefaultEnvironment({
    //     createGround: true,
    //     createSkybox: true,
    // });
    // const skybox = BABYLON.Mesh.CreateBox("BackgroundSkybox", 500, scene, undefined, BABYLON.Mesh.BACKSIDE);
    // const backgroundMaterial = new BABYLON.BackgroundMaterial("backgroundMaterial", scene);
    // backgroundMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", scene);
    // backgroundMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skybox.material = backgroundMaterial;
    // scene.debugLayer.show();

    // Skybox
    // const hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
    // const hdrTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    // const hdrTexture = new BABYLON.HDRCubeTexture("assets/env5.hdr", scene, 512);
    // const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    // hdrSkyboxMaterial.backFaceCulling = false;
    // hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    // hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // hdrSkyboxMaterial.microSurface = 1.0;
    // hdrSkyboxMaterial.disableLighting = true;
    // hdrSkybox.material = hdrSkyboxMaterial;
    // hdrSkybox.infiniteDistance = true;

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    //main camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 15, 15, 14, new BABYLON.Vector3(0, 6, 0), scene);
    // camera.setTarget(BABYLON.Vector3.Zero());

    camera.upperBetaLimit = 1.1;
    camera.lowerBetaLimit = 1.1;
    camera.attachControl(canvas, true);

    engine.enableOfflineSupport = true;

    // Assets manager
    assetsManager = new BABYLON.AssetsManager(scene);

    const manekenTask = assetsManager.addMeshTask("base", "", "/assets/", MainManeken);

    // You can handle success and error on a per-task basis (onSuccess, onError)

    manekenTask.onSuccess = (_) => {
        console.log("image loaded");
        // const mesh = task.loadedMeshes[0];
        // camera.setTarget(task.loadedMeshes[0]);
        // const scale = 1;
        // mesh.scaling = new BABYLON.Vector3(scale,scale,scale);
        // mesh.position = new BABYLON.Vector3(0, -56, 0);
        // camera.setPosition(mesh.position);
    };

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    assetsManager.onTaskError = (_) => {
        console.error("can not load image");
    }

    assetsManager.onFinish = (_) => {
        engine.runRenderLoop(() => {
            scene.render();
        });
    };

    // Can now change loading background color:
    engine.loadingUIBackgroundColor = "Purple";

    // Just call load to initiate the loading sequence
    assetsManager.load();

    return scene;
}

export const getMainScene = () => {
    return scene;
};
