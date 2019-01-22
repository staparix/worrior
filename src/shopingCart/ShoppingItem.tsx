/** @jsx jsx */

import * as React from "react";
import { jsx, css } from "@emotion/core";
import { Entity } from "../mockServer/assetLoader";
// import { SideMenuItem } from "../shell/SideMenuItem";

const cartItem = css`
  position: relative;
  display: inline-block;
`;
const closeButton = css`
  position: absolute;
  top: 0;
  right: 0;
`;

type ShoppingItemProps = {
    item: Entity;
    onRemove: (entity: Entity) => void;
};

export const ShoppingItem: React.FunctionComponent<ShoppingItemProps> = ({ item, onRemove }) => {
    function remove() {
        onRemove(item);
    }

    return (
        <div css={cartItem}>
            <div>{item.meta.assetName}</div>
            <button css={closeButton} onClick={remove}>X</button>
        </div>
    );
};
