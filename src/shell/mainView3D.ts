import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MainManeken } from "../mockServer/assetLoader";

export const bootstrap = (canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise((resolve) => {
        const engine = new BABYLON.Engine(canvas, true);
        const scene = createScene(engine, canvas);
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
    // scene.debugLayer.show();
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 14, new BABYLON.Vector3(0, 6, 0), scene);
    // camera.maxZ = 0;
    // camera.setPosition(new BABYLON.Vector3(0, 0, 20));
    camera.upperBetaLimit = 1.1;
    camera.lowerBetaLimit = 1.1;
    camera.attachControl(canvas, true);

    engine.enableOfflineSupport = false;

    // Assets manager
    assetsManager = new BABYLON.AssetsManager(scene);

    const manekenTask = assetsManager.addMeshTask("base", "", "/assets/", MainManeken);

    // You can handle success and error on a per-task basis (onSuccess, onError)

    manekenTask.onSuccess = (task) => {
        const mesh = task.loadedMeshes[0];
        const scale = 1;
        mesh.scaling = new BABYLON.Vector3(scale,scale,scale);
        // mesh.position = new BABYLON.Vector3(0, -56, 0);
        // camera.setPosition(mesh.position);
    };

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    assetsManager.onTaskError = (_) => {
        console.log("errororors");
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
