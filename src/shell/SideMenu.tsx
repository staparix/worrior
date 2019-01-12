/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { SideMenuItem } from "./SideMenuItem";
import { Entity, getPosition } from "../mockServer/assetLoader";

const sideMenu = css`
`;

type Props = {
    data: Entity[];
    loadAsset: (id: string) => void;
};

export const SideMenu: React.FunctionComponent<Props> = (props) => {
    return (
        <div css={sideMenu}>
            {props.data.map((item, index, data) => {
                return (
                    <SideMenuItem
                        item={item}
                        id={item.id}
                        key={item.meta.assetName + item.century + index}
                        position={getPosition(item.meta.assetName, data)}
                        onClick={props.loadAsset}
                        asset={item.meta.assetName}
                    />
                );
            })}
        </div>
    );
};
