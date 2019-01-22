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
    const mainCamera = new BABYLON.Scene(engine);
    // scene.createDefaultEnvironment({
    //     createGround: true,
    //     createSkybox: true,
    // });
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const camera = new BABYLON.ArcRotateCamera("Camera", 15, 15, 14, new BABYLON.Vector3(0, 6, 0), scene);

    camera.upperBetaLimit = 1.1;
    camera.lowerBetaLimit = 1.1;
    camera.attachControl(canvas, true);

    engine.enableOfflineSupport = true;

    // Assets manager
    assetsManager = new BABYLON.AssetsManager(scene);

    const mainManeken = assetsManager.addMeshTask("base", "", "/assets/", MainManeken);

    mainManeken.onSuccess = (_) => {
        console.log("image loaded");
    };

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    assetsManager.onTaskError = (_) => {
        console.error("can not load image");
    };

    assetsManager.onFinish = (_) => {
        engine.runRenderLoop(() => {
            scene.render();
        });
    };

    // Can now change loading background color:
    engine.loadingUIBackgroundColor = "black";

    // Just call load to initiate the loading sequence
    assetsManager.load();

    return mainCamera;
}

export const getMainScene = () => {
    return scene;
};
