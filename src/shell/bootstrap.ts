import { getAllCategories, getAllCenturies, getAllCountries, getAllModels } from "../utils/domainUtils";
import { Category, Century, Country, Entity } from "../domain";
import { normalizeEntities } from "../parsers/parsers";
import * as BABYLON from "@babylonjs/core";

type Bootstrap = {
    engine: BABYLON.Engine,
    scene: BABYLON.Scene,
    categories: Category[],
    countries: Country[],
    centuries: Century[],
    models: Entity[],
    normalizedEntities: { [entitId: number]: Entity },
};
export const bootstrap = (canvas: HTMLCanvasElement): Promise<Bootstrap> => {
    return new Promise((resolve) => {
        const engine = new BABYLON.Engine(canvas, true);
        const scene = createScene(engine, canvas);
        const renderLoop = () => {
            scene.render();
        };
        engine.runRenderLoop(renderLoop);
        window.addEventListener("resize", () => {
            engine.resize();
        });
        Promise.all([getAllCenturies(), getAllCategories(), getAllCountries(), getAllModels()]).then((data) => {
            const [centuries, categories, countries, models] = data;
            resolve({
                scene: scene,
                engine: engine,
                categories: categories,
                centuries: centuries,
                countries: countries,
                models: models,
                normalizedEntities: normalizeEntities(models),
            });
        });
    });
};

function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    const mainScene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, 1, 0), mainScene);
    light.intensity = 12;
    configureCamera(mainScene, canvas);

    return mainScene;
}

function configureCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    const camera = new BABYLON.ArcRotateCamera("Camera", -7.25, 1.55, 15,
        new BABYLON.Vector3(0, 5, 0), scene);
    camera.wheelPrecision = 10000;
    camera.panningDistanceLimit = 1;
    camera.pinchDeltaPercentage = 0;
    camera.panningSensibility = 1000000000;
    camera.upperBetaLimit = 1.55;
    camera.lowerBetaLimit = 1.55;
    camera.lowerRadiusLimit = 15;
    camera.upperRadiusLimit = 15;

    // @ts-ignore
    camera.inputs.attached.mousewheel.detachControl(canvas);

    camera.attachControl(canvas, true);
}
