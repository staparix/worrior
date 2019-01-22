/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { SideMenuItem } from "./SideMenuItem";
import { Entity } from "../mockServer/assetLoader";

const sideMenu = css`
`;

type Props = {
    data: Entity[];
    loadAsset: (id: string) => void;
};

export const SideMenu: React.FunctionComponent<Props> = (props) => {
    return (
        <div css={sideMenu}>
            {props.data.map((item, index) => {
                return (
                    <SideMenuItem
                        item={item}
                        key={item.meta.assetName + item.century + index}
                        onClick={props.loadAsset}
                    />
                );
            })}
        </div>
    );
};
