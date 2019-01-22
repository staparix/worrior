/** @jsx jsx */
import * as React from "react";
import * as BABAYLON from "babylonjs";
import { css, jsx } from "@emotion/core";
import { Entity } from "../mockServer/assetLoader";
// @ts-ignore
import { getAssetManager } from "../shell/main-engine";

const item = css`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

type Props = {
    item: Entity;
    onClick?: (id: string) => void;
    showLoading?: boolean;
};

export class SideMenuItem extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        showLoading: true,
    };
    private canvas = React.createRef<HTMLCanvasElement>();
    private engine!: BABAYLON.Engine;
    private scene!: BABAYLON.Scene;
    // @ts-ignore
    private camera!: BABAYLON.FreeCamera;
    // @ts-ignore
    private light: BABAYLON.HemisphericLight | null;

    public componentDidMount(): void {
        const canvasEl = this.canvas.current;
        if (canvasEl) {
            this.engine = new BABYLON.Engine(canvasEl);
            BABAYLON.SceneLoader.Load("assets/", this.props.item.meta.assetName, this.engine, (scene) => {
                this.scene = scene;
                this.camera = new BABAYLON.FreeCamera("FreeCamera", new BABAYLON.Vector3(0, 4.5, -20), scene);
                // const meshes = this.scene.getActiveMeshes();
                this.light = new BABAYLON.HemisphericLight("light1", new BABAYLON.Vector3(0, 2, 0), scene);
                this.engine.runRenderLoop(() => {
                    scene.render();
                });
            });
        }
    }

    public componentWillUnmount() {
        while(this.engine.scenes.length > 0) {
            this.engine.scenes[0].dispose();
        }
        this.engine.stopRenderLoop();
        this.scene.dispose();
        this.engine.dispose();
        console.log("remove");
    }

    public render() {
        return (
            <div css={item} onClick={this.loadAssetToTheScreen}>
                <canvas width={100} height={100} ref={this.canvas}/>
            </div>
        );
    }

    private loadAssetToTheScreen = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.item.id);
        }
    }
}
