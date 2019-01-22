import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MainManeken } from "../mockServer/assetLoader";

type Bootstrap = {
    engine: BABYLON.Engine,
    scene: BABYLON.Scene,
};
export const bootstrap = (canvas: HTMLCanvasElement): Promise<Bootstrap> => {
    return new Promise((resolve) => {
        const engine = new BABYLON.Engine(canvas, true);
        const scene = createScene(engine, canvas);
        const renderLoop = () => {
            scene.render();
        };
        engine.runRenderLoop(renderLoop);
        resolve({
            scene: scene,
            engine: engine,
        });
    });
};

export let assetsManager: BABYLON.AssetsManager;
function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    const mainScene = new BABYLON.Scene(engine);
    createGround(mainScene);
    (window as any)["enableDebugger"] =  () => {
        mainScene.debugLayer.show();
    }
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), mainScene);

    const camera = new BABYLON.ArcRotateCamera("Camera", 15, 15, 14, new BABYLON.Vector3(0, 6, 0), mainScene);
    const hdrTexture = new BABYLON.CubeTexture("/assets/studio024.hdr", mainScene);
    mainScene.createDefaultSkybox(hdrTexture, true, 10000);
    // camera.wheelPrecision = 10000;
    // camera.upperBetaLimit = 1.1;
    // camera.lowerBetaLimit = 1.1;
    camera.attachControl(canvas, true);

    // Assets manager
    assetsManager = new BABYLON.AssetsManager(mainScene);

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
            mainScene.render();
        });
    };

    // Can now change loading background color:
    engine.loadingUIBackgroundColor = "black";

    // Just call load to initiate the loading sequence
    assetsManager.load();

    return mainScene;
}

function createGround(scene: BABYLON.SceneComponentConstants) {
    return BABYLON.MeshBuilder.CreateGround("myGround", {
        width: 6, height: 4
    }, scene);
}
