/** @jsx jsx */
import * as React from "react";
import * as BABAYLON from "babylonjs";
import { css, jsx } from "@emotion/core";

const item = css`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

type Props = {
    id: string;
    onClick: (id: string) => void;
    asset: string,
    position: BABAYLON.Vector3;
};

export class SideMenuItem extends React.Component<Props> {
    private canvas = React.createRef<HTMLCanvasElement>();
    private engine: BABAYLON.Engine | null = null;
    private scene: BABAYLON.Scene | null = null;
    private assetsManager: BABAYLON.AssetsManager | null = null;
    // @ts-ignore
    private camera: BABAYLON.FreeCamera | null;
    // @ts-ignore
    private light: BABAYLON.HemisphericLight | null;

    public componentDidMount(): void {
        const canvasEl = this.canvas.current;
        if (canvasEl) {
            this.engine = new BABYLON.Engine(canvasEl);
            this.scene = new BABAYLON.Scene(this.engine);
            this.camera = new BABAYLON.FreeCamera("FreeCamera", new BABAYLON.Vector3(0, 2, -55), this.scene);
            this.light = new BABAYLON.HemisphericLight("light1", new BABAYLON.Vector3(0, 2, 0), this.scene);
            this.assetsManager = new BABAYLON.AssetsManager(this.scene);
            const mesh = this.assetsManager.addMeshTask("other", "", "/assets/", this.props.asset);
            mesh.onSuccess = (task) => {
                const obj = task.loadedMeshes[0];
                if (this.scene) {
                    this.scene.addMesh(obj);
                    const scale = 0.05;
                    obj.scaling = new BABYLON.Vector3(scale, scale, scale);
                    obj.position = this.props.position;
                    obj.rotate(new BABAYLON.Vector3(5, -11, 0), 0);
                }
            };
            this.assetsManager.onFinish = (_) => {
                this.engine!.runRenderLoop(() => {
                    this.scene!.render();
                });
            };
            this.assetsManager.load();
        }
    }

    public render() {
        return (
            <div css={item} onClick={this.loadAssetToTheScreen}>
                <canvas width={100} height={100} ref={this.canvas}/>
            </div>
        );
    }

    private loadAssetToTheScreen = () => {
        this.props.onClick(this.props.id);
    }
}
