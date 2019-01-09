/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { SideMenuItem } from "./SideMenuItem";
import { assetsManager } from "./mainView3D";
import { Entity, getById, getPositionByAssetName } from "../mockServer/assetLoader";

const sideMenu = css`
`;

const loadedOnTheScene: { [key: string]: BABYLON.AbstractMesh } = {};

function loadAssetFromApi({ meta: {assetName}, id}: Entity) {
    const meshTask = assetsManager.addMeshTask(assetName, "", "/assets/", assetName);
    meshTask.onSuccess = (task) => {
        loadedOnTheScene[id] = task.loadedMeshes[0];
    };
    assetsManager.load();
}

function replaceAsset(prevAsset: Entity, newAsset: Entity) {
    if (loadedOnTheScene[prevAsset.id]) {
        loadedOnTheScene[prevAsset.id].dispose();
    }
    loadAssetFromApi(newAsset);
}

type Props = {
    data: Entity[];
    onChange: (ids: string[]) => void;
};

function uniqueArray<T>(arr: T[]): T[] {
    return Array.from(new Set<T>(arr));
}

export const SideMenu: React.FunctionComponent<Props> = (props) => {
    const [selectedAssetIds, setAsset] = React.useState<string[]>(uniqueArray<string>([]));
    React.useEffect(() => {
        props.onChange(selectedAssetIds);
    }, [selectedAssetIds]);
    const loadAssetFromServer = (id: string) => {
        const itemData = getById(id, props.data);
        if (!itemData || selectedAssetIds.indexOf(id) !== -1) {
            return;
        }

        const toReplaceId = selectedAssetIds.find((itemID) => {
            const item = getById(itemID, props.data);
            return item ? item.category === itemData.category : false;
        });

        if (toReplaceId) {
            replaceAsset(getById(toReplaceId, props.data)!, itemData);
            setAsset(uniqueArray([...selectedAssetIds.filter((iID) => toReplaceId !== iID), id]));
            return;
        }

        loadAssetFromApi(itemData);
        setAsset(uniqueArray([...selectedAssetIds, id]));
    };
    return (
        <div css={sideMenu}>
            {props.data.map((item, index, data) => {
                return (
                    <SideMenuItem
                        id={item.id}
                        key={item.meta.assetName + item.century + index}
                        position={getPositionByAssetName(item.meta.assetName, data)}
                        onClick={loadAssetFromServer}
                        asset={item.meta.assetName}
                    />
                );
            })}
        </div>
    );
};
