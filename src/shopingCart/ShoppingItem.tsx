import * as React from "react";
import { Entity } from "../mockServer/assetLoader";

type ShoppingItemProps = {
    item: Entity;
    onRemove: (entity: Entity) => void;
};

export const ShoppingItem: React.FunctionComponent<ShoppingItemProps> = ({ item, onRemove }) => {
    function remove() {
        onRemove(item);
    }
    return (
        <div>{item.meta.assetName} <button onClick={remove}>X</button></div>
    );
};
