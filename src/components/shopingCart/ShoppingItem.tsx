/** @jsx jsx */

import * as React from "react";
import { jsx } from "@emotion/core";
import { Entity } from "../../domain";

type ShoppingItemProps = {
    item: Entity;
    onRemove: (entity: Entity) => void;
};

export const ShoppingItem: React.FunctionComponent<ShoppingItemProps> = ({ item, onRemove }) => {
    function remove() {
        onRemove(item);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{item.displayName}</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a onClick={remove} href="#" className="btn btn-primary">убрать</a>
            </div>
        </div>
    );
};
