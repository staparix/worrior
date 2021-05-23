import * as React from "react";
import { render } from "react-dom";
import { Shell } from "./shell/Shell";
import "react-picky/dist/picky.css";
import "./warrior-styles.css";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

window.InitWarrior = (id: string, options: Options = {}) => {
    if (!options.modelRoot) {
        throw new Error(`Please provide folder of models, example /assets`);
    }
    (window as any).MainManikenUrlTarget = {
        modelRoot: options.modelRoot,
        onOrder: options.onOrder || function noop() {}
    };
    const rootElement = document.getElementById(id);
    if (!rootElement) {
        throw new Error(`Element with id=${ id } didn't find, please provide correct element id`);
    }
    render(<Shell/>, rootElement);
};
